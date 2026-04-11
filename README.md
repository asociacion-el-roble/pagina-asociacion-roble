# 🌿 Página Web - Asociación de Desarrollo El Roble

Proyecto web desarrollado para la Asociación de Desarrollo del Barrio El Roble.

## 🚀 Descripción

Este proyecto es una página web moderna desarrollada con React + Vite, diseñada para:

- Mostrar actas organizadas por año
- Publicar noticias de la comunidad
- Mostrar galería de imágenes
- Brindar información de contacto
- Permitir administración mediante un CMS (Decap CMS)

---

## 🛠️ Tecnologías utilizadas

- React (Vite)
- TypeScript
- Tailwind CSS
- React Router (HashRouter)
- GitHub Pages (hosting)
- Decap CMS (panel administrador)

---

## 📁 Estructura del proyecto
asociacion-roble/
├── content/
│ ├── actas/
│ └── noticias/
├── public/
│ ├── actas/
│ ├── galeria/
│ ├── uploads/
│ └── admin/
│ ├── index.html
│ └── config.yml
├── src/
│ ├── components/
│ ├── pages/
│ └── App.tsx
├── dist/ (generado automáticamente)
├── package.json
└── vite.config.ts


---

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio


git clone https://github.com/asociacion-el-roble/pagina-asociacion-roble.git

cd pagina-asociacion-roble


---

### 2. Instalar dependencias


npm install


---

### 3. Ejecutar en modo desarrollo


npm run dev


👉 Abrir en navegador:

http://localhost:5173


---

## 🏗️ Build de producción


npm run build


👉 Esto genera la carpeta:

/dist


---

## 🌐 Publicación en GitHub Pages

### 1. Configurar base en `vite.config.ts`


base: '/pagina-asociacion-roble/'


---

### 2. Deploy


npm run deploy


---

### 3. Configurar GitHub Pages

En el repositorio:

- Settings → Pages
- Source: Deploy from branch
- Branch: `gh-pages`
- Folder: `/ (root)`

---

### 4. Acceder al sitio


https://asociacion-el-roble.github.io/pagina-asociacion-roble/


---

## 🔐 Panel Administrador (CMS)

### Acceso:


https://asociacion-el-roble.github.io/pagina-asociacion-roble/admin/index.html


---

### Funcionalidades:

- Crear actas
- Subir archivos PDF
- Crear noticias
- Subir imágenes

---

### Configuración CMS:

Archivo:


/public/admin/config.yml


---

## 📂 Gestión de archivos

### Actas:

/public/actas/


### Imágenes:

/public/galeria/


### Subidas del CMS:

/public/uploads/


---

## ⚠️ Consideraciones importantes

- Se utiliza `HashRouter` para compatibilidad con GitHub Pages
- Las rutas deben manejarse con `#/`
- No usar rutas absolutas del sistema (C:\...)
- Los nombres de archivos deben ser simples (sin espacios)

---

## 🧓 Diseño UX

Pensado para usuarios adultos mayores:

- Botones grandes
- Navegación simple
- Texto claro
- Diseño limpio

---

## 🚀 Futuras mejoras

- Integración completa del CMS con frontend
- Sistema automático de actas dinámicas
- Galería avanzada (zoom, visor)
- Formulario funcional (email o WhatsApp API)
- Dominio personalizado

---

## 👨‍💻 Mantenimiento

Para actualizar el proyecto:

1. Hacer cambios en el código
2. Ejecutar:


npm run build
npm run deploy


---

## 📌 Nota

Este proyecto está diseñado para ser fácilmente mantenido por otros desarrolladores en el futuro.

---

## 💼 Autor

Proyecto desarrollado para la Asociación de Desarrollo El Roble.