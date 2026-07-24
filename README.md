# Página web de la Asociación de Desarrollo El Roble

Sitio público y sistema de administración de contenido para la Asociación de Desarrollo El Roble. Está pensado para presentar información comunal de forma sencilla y permitir que la asociación actualice el contenido sin modificar código.

## Estado del proyecto

El sitio está publicado y el CMS está conectado de extremo a extremo:

- Sitio público en GitHub Pages.
- Panel Decap CMS autenticado con GitHub.
- OAuth proxy publicado en Cloudflare Workers.
- Ediciones y archivos guardados como commits en `main`.
- Compilación y publicación automática en `gh-pages` mediante GitHub Actions.
- Carga real de documentos verificada con un archivo DOCX.

## URLs

Sitio público:

```text
https://asociacion-el-roble.github.io/pagina-asociacion-roble/
```

Acceso administrativo:

```text
https://asociacion-el-roble.github.io/pagina-asociacion-roble/#/admin-login
```

Panel directo:

```text
https://asociacion-el-roble.github.io/pagina-asociacion-roble/admin/
```

OAuth proxy:

```text
https://ade-roble-decap-oauth.ade-el-roble.workers.dev
```

Repositorio:

```text
https://github.com/asociacion-el-roble/pagina-asociacion-roble
```

## Funciones públicas

- Inicio e información comunal.
- Misión, visión, valores y TCU.
- Documentos principales y planes de trabajo.
- Actas de Junta Directiva y Asamblea General, separadas por año.
- Noticias.
- Galería de imágenes.
- Calendario de actividades.
- Página de contacto con correo y WhatsApp.
- Enlaces opcionales para Facebook, Instagram, YouTube y TikTok.

Las redes sociales sin URL no se muestran.

## Administración de contenido

El panel permite editar:

- Textos principales y datos de contacto.
- Documentos principales.
- Actas.
- Noticias.
- Galería.
- Calendario.
- WhatsApp y enlaces de redes sociales.

El contenido se encuentra en:

```text
public/content/
```

Los archivos cargados desde Decap se guardan en:

```text
public/uploads/
```

Cuando una persona autorizada pulsa guardar en Decap:

1. GitHub recibe un commit en `main`.
2. El workflow `.github/workflows/deploy.yml` instala dependencias.
3. Vite compila el sitio.
4. El resultado se publica en `gh-pages`.
5. GitHub Pages actualiza el sitio público.

## Autenticación y seguridad

El acceso tiene dos capas:

1. Un acceso visual que abre el panel administrativo.
2. Autenticación real mediante GitHub OAuth.

La seguridad real depende de GitHub. Solo una cuenta con permiso de escritura sobre el repositorio puede guardar cambios.

No se almacenan secretos en el repositorio. Las variables `GITHUB_OAUTH_ID` y `GITHUB_OAUTH_SECRET` están guardadas como secretos del Worker en Cloudflare.

No se deben eliminar:

- El Worker `ade-roble-decap-oauth`.
- La OAuth App `ADE El Roble Decap CMS`.
- Los secretos del Worker.
- El workflow de publicación.
- La rama `gh-pages`.

Las credenciales del acceso visual se entregan por separado a las personas responsables y no deben considerarse la protección principal.

## Detalle importante de Decap

El panel carga una versión fija de Decap CMS:

```text
3.12.2
```

Se fijó esta versión porque `3.15.0`, publicada el 23 de julio de 2026, provocaba un error de React al mostrar la vista previa de archivos generales como DOCX. También se desactivó la vista previa genérica en documentos y actas; esto no afecta la carga ni la descarga de archivos.

No cambiar nuevamente a una versión flotante como `@^3.0.0` sin probar antes la carga de PDF, DOCX e imágenes.

## Tecnologías

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router con `HashRouter`
- Decap CMS
- GitHub OAuth
- Cloudflare Workers
- GitHub Actions
- GitHub Pages

## Estructura principal

```text
.github/workflows/deploy.yml  Publicación automática
oauth-proxy/                  Worker OAuth de Cloudflare
public/admin/                 Panel y configuración de Decap
public/content/               Contenido editable
public/uploads/               Archivos cargados desde el CMS
src/components/               Componentes compartidos
src/lib/                      Lectura del contenido
src/pages/                    Páginas públicas
src/types/                    Tipos TypeScript
```

## Desarrollo local

Requisitos:

- Node.js 22
- npm

Instalación y servidor local:

```bash
npm install
npm run dev
```

URL local:

```text
http://127.0.0.1:5173/pagina-asociacion-roble/
```

Validaciones:

```bash
npm run build
npx eslint .
```

Publicación manual de emergencia:

```bash
npm run deploy
```

Normalmente no es necesario publicar manualmente porque cada push a `main` ejecuta GitHub Actions.

## Mantenimiento del OAuth proxy

```bash
cd oauth-proxy
npm install
npm run whoami
npm run deploy
```

Los secretos se administran desde Cloudflare o con:

```bash
npx wrangler secret put GITHUB_OAUTH_ID
npx wrangler secret put GITHUB_OAUTH_SECRET
```

Nunca se deben pegar secretos en documentación, commits, capturas o conversaciones.

## Trabajo pendiente

- Sustituir el teléfono, WhatsApp, correo y dirección de ejemplo por los datos públicos definitivos.
- Agregar las URL reales de las redes sociales que use la asociación.
- Eliminar o reemplazar el documento de prueba si no corresponde al Estatuto.

La guía de operación y recuperación está en:

```text
GUIA-PENDIENTE-CMS.txt
```

La documentación técnica adicional de OAuth está en:

```text
docs/decap-github-auth.md
```
