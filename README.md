# VerdeBendito

Tienda online construida con Node.js, Express, EJS, Sequelize y MySQL.

## Requisitos
- Node.js 20 o superior
- MySQL
- Variables de entorno configuradas a partir de `.env.example`

## Instalación
1. Cloná el repositorio.
2. Ejecutá `npm install`.
3. Copiá `.env.example` como `.env` y completá los datos de MySQL.
4. Ejecutá `npm run dev` para desarrollo o `npm start` para iniciar el servidor.

La aplicación escucha en `PORT` (3000 por defecto). En producción también es obligatorio definir `SESSION_SECRET`.

## Funcionalidades
- Catálogo de productos y categorías.
- Filtros por categoría, nombre y rango de precio.
- Búsqueda dinámica.
- Detalle de producto.
- Carrito de compras almacenado en la sesión.
- Registro, inicio y cierre de sesión.

## Pendiente antes de vender en producción
El carrito permite armar y revisar pedidos, pero el pago, los envíos y la confirmación de compra todavía no están conectados. Para habilitarlos hay que definir el medio de pago, la logística y los datos comerciales. En producción también se recomienda configurar un almacén persistente de sesiones y protección CSRF.
