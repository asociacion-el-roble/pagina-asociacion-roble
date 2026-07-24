function randomState(bytes = 16) {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (value) => value.toString(16).padStart(2, "0")).join(
    "",
  );
}

function callbackUrl(url) {
  return `${url.origin}/callback?provider=github`;
}

function htmlResponse(body, init = {}) {
  return new Response(body, {
    ...init,
    headers: {
      "content-type": "text/html; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

function cookieValue(cookieHeader, name) {
  return (cookieHeader || "")
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .find(([cookieName]) => cookieName === name)?.[1];
}

function requireGithubSecrets(env) {
  if (!env.GITHUB_OAUTH_ID || !env.GITHUB_OAUTH_SECRET) {
    return new Response("Missing GitHub OAuth secrets", { status: 500 });
  }

  return null;
}

function authorize(url, env) {
  const missingSecrets = requireGithubSecrets(env);

  if (missingSecrets) {
    return missingSecrets;
  }

  if (url.searchParams.get("provider") !== "github") {
    return new Response("Invalid provider", { status: 400 });
  }

  const scope =
    env.GITHUB_REPO_PRIVATE === "1" ? "repo,user" : "public_repo,user";
  const state = randomState();
  const githubUrl = new URL("https://github.com/login/oauth/authorize");

  githubUrl.searchParams.set("client_id", env.GITHUB_OAUTH_ID);
  githubUrl.searchParams.set("redirect_uri", callbackUrl(url));
  githubUrl.searchParams.set("scope", scope);
  githubUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      location: githubUrl.toString(),
      "set-cookie": `decap_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=600`,
    },
  });
}

async function exchangeCode(request, url, env) {
  const missingSecrets = requireGithubSecrets(env);

  if (missingSecrets) {
    return missingSecrets;
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = cookieValue(
    request.headers.get("cookie"),
    "decap_oauth_state",
  );

  if (url.searchParams.get("provider") !== "github") {
    return new Response("Invalid provider", { status: 400 });
  }

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  if (!state || !expectedState || state !== expectedState) {
    return new Response("Invalid OAuth state", { status: 400 });
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_ID,
      client_secret: env.GITHUB_OAUTH_SECRET,
      code,
      redirect_uri: callbackUrl(url),
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    return new Response("GitHub token exchange failed", { status: 502 });
  }

  const message = `authorization:github:success:${JSON.stringify({
    token: data.access_token,
  })}`;

  return htmlResponse(
    `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Autorizando Decap</title>
  </head>
  <body>
    <p>Autorizando Decap...</p>
    <script>
      const receiveMessage = () => {
        window.opener.postMessage(${JSON.stringify(message)}, "*");
        window.removeEventListener("message", receiveMessage, false);
      };

      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  </body>
</html>`,
    {
      headers: {
        "set-cookie":
          "decap_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=0",
      },
    },
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return authorize(url, env);
    }

    if (url.pathname === "/callback") {
      return exchangeCode(request, url, env);
    }

    return htmlResponse("<p>Decap OAuth proxy activo.</p>");
  },
};
