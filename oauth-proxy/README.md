# OAuth proxy para Decap CMS

Worker minimo para autenticar Decap CMS contra GitHub cuando el sitio esta publicado como sitio estatico, por ejemplo en GitHub Pages.

## Uso

```bash
copy wrangler.toml.example wrangler.toml
npx wrangler login
npx wrangler secret put GITHUB_OAUTH_ID
npx wrangler secret put GITHUB_OAUTH_SECRET
npx wrangler deploy
```

Despues de publicar, usar la URL del worker en `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: asociacion-el-roble/pagina-asociacion-roble
  branch: main
  base_url: https://TU-PROXY.workers.dev
  auth_endpoint: /auth
```

La OAuth App de GitHub debe tener:

```text
Homepage URL: https://TU-PROXY.workers.dev
Authorization callback URL: https://TU-PROXY.workers.dev/callback
```

