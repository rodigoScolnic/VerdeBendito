# VerdeBendito

Tienda online construida con Node.js, Express, EJS, Sequelize y PostgreSQL.

## Requisitos
- Node.js 20 o superior
- PostgreSQL
- Variables de entorno configuradas a partir de `.env.example`

## Instalación
1. Cloná el repositorio.
2. Ejecutá `npm install`.
3. Copiá `.env.example` como `.env` y completá los datos de PostgreSQL.
4. Ejecutá `npm run dev` para desarrollo o `npm start` para iniciar el servidor.

La aplicación escucha en `PORT` (3000 por defecto). En producción es obligatorio definir `SESSION_SECRET`. En Render, el Blueprint configura automáticamente `DATABASE_URL` y el secreto de sesión. Las sesiones y el carrito se guardan en PostgreSQL.

## Deploy en Render
El archivo `render.yaml` define el servicio web Node y una base PostgreSQL. Desde Render, creá un **Blueprint** y conectá este repositorio. Render leerá el archivo y propondrá crear ambos recursos.

## Funcionalidades
- Catálogo de productos y categorías.
- Filtros por categoría, nombre y rango de precio.
- Búsqueda dinámica.
- Detalle de producto.
- Carrito de compras almacenado en la sesión.
- Registro, inicio y cierre de sesión.

## Demo
Esta versión permite probar el catálogo, las cuentas y el carrito. No procesa pagos ni confirma ventas reales. Antes de usarla comercialmente, revisá los planes, backups, persistencia, seguridad y configuración de sesiones de Render.
