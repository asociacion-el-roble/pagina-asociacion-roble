# Autenticacion real de Decap CMS con GitHub

La opcion recomendada para este proyecto es mantener GitHub Pages como hosting publico y usar Decap CMS con el backend `github`, mas un OAuth proxy externo. Asi los cambios del CMS se guardan como commits en el repositorio y los PDF/imagenes quedan en `public/uploads/`.

## Por que esta opcion

- No requiere migrar el sitio a Vercel ni a Netlify.
- Evita Netlify Identity/Git Gateway para nuevas configuraciones, porque Git Gateway esta deprecado.
- Usa el backend oficial `github` de Decap.
- Requiere que cada persona administradora tenga cuenta de GitHub con permiso de escritura en `asociacion-el-roble/pagina-asociacion-roble`.

## Estado actual

La integración está activa:

```text
Worker: https://ade-roble-decap-oauth.ade-el-roble.workers.dev
Callback: https://ade-roble-decap-oauth.ade-el-roble.workers.dev/callback
Repositorio: asociacion-el-roble/pagina-asociacion-roble
Rama de contenido: main
Rama publicada: gh-pages
```

## Flujo final

1. La persona entra a `/#/admin-login`.
2. Escribe el acceso visual local del sitio.
3. El sitio abre `/admin/`.
4. Decap muestra "Login with GitHub".
5. GitHub autoriza mediante el OAuth proxy.
6. Decap guarda cambios y archivos en el repositorio.
7. GitHub Actions compila y publica automáticamente en `gh-pages`.

## 1. Crear OAuth App en GitHub

En GitHub, entrar con una cuenta que administre la organizacion o el repositorio:

```text
Settings > Developer settings > OAuth Apps > New OAuth App
```

Usar estos valores:

```text
Application name: ADE El Roble Decap CMS
Homepage URL: https://ade-roble-decap-oauth.ade-el-roble.workers.dev
Authorization callback URL: https://ade-roble-decap-oauth.ade-el-roble.workers.dev/callback
```

Guardar:

```text
Client ID
Client Secret
```

El `Client Secret` no se sube al repositorio.

## 2. Publicar el OAuth proxy en Cloudflare Workers

Hay una plantilla local en:

```text
oauth-proxy/
```

Instalar las dependencias:

```bash
cd oauth-proxy
npm install
```

Editar `wrangler.toml` si se desea cambiar el nombre del worker o usar dominio propio.

Iniciar sesion en Cloudflare y guardar secretos:

```bash
npm run login
npx wrangler secret put GITHUB_OAUTH_ID
npx wrangler secret put GITHUB_OAUTH_SECRET
```

Si el repositorio se vuelve privado, cambiar `GITHUB_REPO_PRIVATE` a `"1"` en `wrangler.toml`.

Publicar:

```bash
npm run deploy
```

Al final Cloudflare mostrara una URL similar a:

```text
https://ade-roble-decap-oauth.ade-el-roble.workers.dev
```

Esa sera la URL del proxy.

## 3. Activar el proxy en Decap

La configuración activa en `public/admin/config.yml` es:

```yaml
backend:
  name: github
  repo: asociacion-el-roble/pagina-asociacion-roble
  branch: main
  base_url: https://ade-roble-decap-oauth.ade-el-roble.workers.dev
  auth_endpoint: /auth
```

Cada push o commit creado por Decap en `main` ejecuta:

```text
.github/workflows/deploy.yml
```

El workflow compila el sitio y actualiza `gh-pages`. `npm run deploy` queda
disponible solamente para una publicación manual de emergencia.

## 4. Permisos de GitHub

Las personas que usen Decap con el backend `github` deben tener permiso de escritura en el repositorio. Para una asociacion, lo mas simple es crear una cuenta GitHub administradora o agregar a las personas responsables como colaboradoras.

Si se quiere que usuarios sin GitHub editen contenido, habria que usar otro servicio de identidad o un gateway propio. Para este proyecto no conviene empezar por ahi.

## 5. Prueba final

1. Abrir el sitio publicado.
2. Entrar a `/#/admin-login`.
3. Iniciar con el acceso visual.
4. Presionar "Login with GitHub" en Decap.
5. Editar una actividad de calendario o subir un PDF de prueba.
6. Guardar.
7. Confirmar que aparece un commit nuevo en GitHub.
8. Confirmar que el sitio publicado muestra el cambio.
