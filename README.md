# Pagina web ADE El Roble

Sitio web para la Asociacion de Desarrollo del barrio El Roble. Reemplaza la pagina de Google Sites con una experiencia mas profesional, simple para adultos mayores y administrable sin tocar codigo.

## Funciones

- Inicio con informacion comunal.
- Mision, vision, valores, documentos principales y TCU.
- Actas separadas por Junta Directiva y Asamblea General.
- Actas divididas por año.
- Noticias editables.
- Galeria de fotos.
- Calendario de actividades.
- Contacto con WhatsApp, correo y formulario por email.
- Panel administrador con Decap CMS.

## Tecnologias

- React + Vite
- TypeScript
- Tailwind CSS
- React Router con HashRouter
- GitHub Pages
- Decap CMS

## Estructura importante

```text
public/
  admin/
    index.html
    config.yml
  content/
    actas.json
    calendario.json
    documentos.json
    galeria.json
    noticias.json
    site.json
  uploads/
src/
  components/
  lib/
  pages/
  types/
```

## Ejecucion local

```bash
npm install
npm run dev
```

URL local:

```text
http://127.0.0.1:5173/pagina-asociacion-roble/
```

## Build

```bash
npm run build
```

## Deploy en GitHub Pages

```bash
npm run deploy
```

El sitio usa esta base:

```ts
base: "/pagina-asociacion-roble/"
```

## Administracion

La pagina publica no pide login. Las personas visitantes pueden ver actas,
reuniones, noticias y demas informacion sin iniciar sesion.

Boton de acceso para administradores dentro del sitio:

```text
/#/admin-login
```

Credenciales basicas del acceso visual:

```text
usuario: admin
contrasena: Roble2026
```

Panel directo:

```text
/admin/index.html
```

El administrador puede editar:

- Textos principales y contacto.
- Documentos principales.
- Actas por tipo y año.
- Noticias.
- Fotos de galeria.
- Calendario de actividades.

Los archivos subidos por el CMS se guardan en:

```text
public/uploads/
```

## Autenticacion real del CMS

La opcion recomendada para este sitio es:

- Mantener GitHub Pages como hosting publico.
- Usar Decap CMS con backend `github`.
- Publicar un OAuth proxy gratuito en Cloudflare Workers.
- Dar permiso de escritura en GitHub a las personas administradoras.

Guia completa:

```text
docs/decap-github-auth.md
```

Plantilla del OAuth proxy:

```text
oauth-proxy/
```
