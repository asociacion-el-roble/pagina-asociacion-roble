# Página web de la Asociación de Desarrollo El Roble

Sitio público y sistema de administración de contenido para ADE El Roble. La asociación puede actualizar textos, documentos, actas, noticias, imágenes, videos y actividades desde un panel web, sin modificar código ni ejecutar comandos.

## Estado

El proyecto está terminado y publicado. El flujo completo fue probado con cambios reales creados desde el CMS:

- Decap CMS guarda los cambios como commits en `main`.
- GitHub Actions compila el proyecto automáticamente.
- El resultado se publica en `gh-pages` y GitHub Pages.
- Los archivos subidos se guardan en `public/uploads/`.
- El sitio consulta el contenido sin caché, al abrir la página, al volver a la pestaña y cada 30 segundos.
- Las noticias se muestran de la más reciente a la más antigua.

La publicación normalmente tarda entre 1 y 3 minutos después de guardar en Admin. No es necesario ejecutar `npm run deploy` ni solicitar una revisión técnica.

## Enlaces

- Sitio público: <https://asociacion-el-roble.github.io/pagina-asociacion-roble/>
- Administrador: <https://asociacion-el-roble.github.io/pagina-asociacion-roble/#/admin-login>
- Panel directo: <https://asociacion-el-roble.github.io/pagina-asociacion-roble/admin/>
- Repositorio: <https://github.com/asociacion-el-roble/pagina-asociacion-roble>
- Historial: <https://github.com/asociacion-el-roble/pagina-asociacion-roble/commits/main>
- Publicaciones automáticas: <https://github.com/asociacion-el-roble/pagina-asociacion-roble/actions>
- OAuth proxy: <https://ade-roble-decap-oauth.ade-el-roble.workers.dev>

## Uso del administrador

1. Abrir el enlace **Administrador**.
2. Ingresar las credenciales visuales entregadas a la asociación.
3. Seleccionar **Login with GitHub**.
4. Iniciar sesión con una cuenta de GitHub con permiso de escritura sobre `asociacion-el-roble/pagina-asociacion-roble`.
5. Abrir una sección, editarla y pulsar **Guardar** o **Publicar**.
6. Esperar entre 1 y 3 minutos y abrir la página pública.

El panel permite administrar:

- Textos principales, misión, visión, valores y TCU.
- Dirección, teléfono, correo, WhatsApp y redes sociales.
- Estatuto, Acta Constitutiva y planes de trabajo.
- Actas de Junta Directiva y Asamblea General por año.
- Noticias e imágenes.
- Galería de fotografías y videos de Google Drive.
- Calendario de reuniones y actividades.

Para agregar elementos a una lista, se usa **Agregar**. Para eliminarlos, se abre el elemento y se usa la opción de quitar; luego se guarda la colección completa.

## Archivos y videos

Los PDF, DOCX e imágenes cargados desde el CMS quedan en:

```text
public/uploads/
```

Se recomiendan nombres sencillos, por ejemplo `acta-junta-2026-07.pdf`.

Los videos se mantienen en Google Drive para evitar aumentar el repositorio. Cada video debe estar como **Cualquier persona con el enlace — Lector**. En **Galería → Videos** se registra un título y el enlace público de Drive.

Los documentos externos de Drive también deben tener acceso público. Si un acta solicita permiso, se debe cambiar su acceso en Google Drive o subir el archivo directamente desde el CMS.

## Publicación automática

```text
Decap CMS
  → commit en main
  → GitHub Actions: Publicar sitio
  → npm ci y npm run build
  → rama gh-pages
  → GitHub Pages
  → actualización automática en el navegador
```

La configuración está en `.github/workflows/deploy.yml`. Cada cambio en `main` inicia el proceso automáticamente.

## Autenticación y seguridad

El acceso visual es una primera barrera, pero la autorización real depende de GitHub OAuth. Solo las cuentas con permiso de escritura pueden guardar cambios.

No se deben borrar:

- El Worker `ade-roble-decap-oauth`.
- La OAuth App `ADE El Roble Decap CMS`.
- Los secretos `GITHUB_OAUTH_ID` y `GITHUB_OAUTH_SECRET` del Worker.
- `public/admin/config.yml` y `public/admin/index.html`.
- `.github/workflows/deploy.yml`.
- Las ramas `main` y `gh-pages`.

No se deben guardar tokens, secretos, códigos de recuperación ni contraseñas institucionales en el repositorio.

El panel usa `decap-cms@3.12.2`. Esta versión está fijada porque una versión posterior produjo un error de React en la vista previa de archivos generales. Antes de actualizarla se deben probar el login, la edición y la carga de PDF, DOCX e imágenes.

## Si un cambio no aparece

1. Confirmar que Decap mostró el guardado exitoso.
2. Abrir [GitHub Actions](https://github.com/asociacion-el-roble/pagina-asociacion-roble/actions).
3. Verificar que **Publicar sitio** y **pages build and deployment** terminaron en verde.
4. Esperar hasta 3 minutos. La página abierta se actualiza al recuperar el foco o, como máximo, en 30 segundos después de que GitHub Pages termine.
5. Si solo un documento de Drive solicita permiso, corregir el acceso del archivo en Drive.

## Desarrollo local

Requisitos: Node.js 22 y npm.

```bash
npm install
npm run dev
```

Validación:

```bash
npm run build
npx eslint .
```

La publicación manual `npm run deploy` se reserva para recuperación; el funcionamiento normal utiliza GitHub Actions.

## Estructura

```text
.github/workflows/deploy.yml  Publicación automática
oauth-proxy/                  Worker OAuth de Cloudflare
public/admin/                 Panel y configuración de Decap CMS
public/content/               Datos editables del sitio
public/uploads/               Archivos cargados desde el CMS
src/lib/                      Lectura y actualización del contenido
src/pages/                    Páginas públicas
src/types/                    Tipos TypeScript
```

La documentación técnica del proxy OAuth permanece en `docs/decap-github-auth.md`.
