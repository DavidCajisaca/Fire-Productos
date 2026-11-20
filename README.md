# CRUD de Productos con Angular y Cloud Firestore

Aplicacion web desarrollada en Angular integrada con Cloud Firestore para gestionar un catalogo de productos (crear, consultar, actualizar y eliminar) verificando la persistencia de datos.

## Modelo de Producto
Coleccion en Firestore: `productos`

- `id` (string, identificador del documento en Firestore)
- `nombre` (string)
- `precio` (number, mayor o igual a 0)
- `stock` (number, entero mayor o igual a 0)
- `categoria` (string)

## Funciones del CRUD y Validaciones
- **Crear:** registra un nuevo producto desde el formulario en la coleccion `productos`.
- **Consultar:** obtiene los documentos de `productos` desde `ProductoService` y los muestra en una tabla HTML.
- **Actualizar:** carga el producto seleccionado en el formulario y actualiza el mismo documento mediante su `id`.
- **Eliminar:** solicita confirmacion antes de borrar el documento; si se cancela, conserva el producto.
- **Validaciones y estados:** valida texto en `nombre` y `categoria`, `precio >= 0`, `stock` entero `>= 0`, bloquea envios invalidos, muestra mensajes de validacion/error o aviso de coleccion vacia y actualiza la tabla tras cada escritura.

## Configuracion de Firebase
1. Crea un proyecto en Firebase Console y habilita **Cloud Firestore**.
2. Crea la coleccion `productos` y registra una aplicacion web.
3. Configura las credenciales de Firebase en `src/app/config/firebase.config.ts` (evitando subir credenciales privadas sensibles al repositorio).

## Instalacion y ejecucion local
```bash
npm install
ng serve
