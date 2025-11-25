# Golden Break API 🎱

Esta es la **API de Golden Break**, una tienda de artículos de billar.  
Permite gestionar usuarios, productos, categorías, carritos, órdenes, pagos, reviews, direcciones de envío, lista de deseos o articulos favoritos (wishlist) y notificaciones.

---

## 🔹 Estructura del proyecto

goldenbreak/
│
├── controllers/
│ ├── authController.js # Login y registro de usuarios
│ ├── cartController.js # CRUD del carrito de compras
│ ├── categoryController.js # CRUD de categorías de productos
│ ├── notificationController.js # Manejo de notificaciones
│ ├── orderController.js # CRUD de órdenes
│ ├── paymentController.js # Pagos y métodos de pago
│ ├── productController.js # CRUD de productos
│ ├── reviewController.js # Reviews de productos
│ ├── shippingAddressesController.js # CRUD de direcciones de envío
│ ├── userController.js # Gestión de usuarios
│ └── wishController.js # Wishlist de usuarios
│
├── models/ # Aquí se comparte la estructura/campos que contiene cada uno de estos
│ ├── cart.js 
│ ├── category.js
│ ├── notification.js
│ ├── order.js
│ ├── paymentMethod.js
│ ├── product.js
│ ├── review.js
│ ├── shippingAddress.js
│ ├── user.js
│ └── whishList.js
│
├── routes/ # En cada rutas designo los endpoints para cada función de los controllers
│ ├── authRoutes.js
│ ├── cartRoutes.js
│ ├── categoryRoutes.js
│ ├── index.js # Registro de todas las rutas del server
│ ├── notificationRoutes.js
│ ├── orderRoutes.js
│ ├── paymentMethodsRoutes.js
│ ├── productRoutes.js
│ ├── reviewRoutes.js
│ ├── shippingAddsRoutes.js
│ ├── userRoutes.js
│ └── whishRoutes.js
│
├── middlewares/ # En esta carpeta contenemos los distintos middlewares tanto para cada query así como la validación de errores globales
│ ├── authMiddleware.js
│ ├── errorHandler.js
│ ├── globalErrorHandler.js
│ ├── isAdminMiddleware.js
│ ├── logger.js
│ └── validation.js
│
├── config/
│ └── database.js # Configuración de conexión a MongoDB usando .env
│
├── .env # Variables de entorno
├── package.json
└── README.md

## 🚀 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/mora9916/goldenbreak.git
cd goldenbreak

📂 Funcionalidades principales

Autenticación
Registro de usuarios
Login y manejo de tokens JWT
Usuarios
Crear, actualizar, eliminar y ver usuarios
Productos
CRUD completo
Categorías
CRUD completo
Carrito
Agregar, actualizar, eliminar productos
Obtener carrito por usuario
Órdenes
Crear, actualizar, consultar órdenes
Pagos
Registro y manejo de pagos
Wishlist
CRUD de lista deseos de usuario
Reviews
CRUD de reseñas de productos
Direcciones de envío
CRUD de direcciones
Notificaciones
Enviar y consultar notificaciones

💻 Tecnologías usadas

Node.js
Express
MongoDB / Mongoose
JSON Web Tokens (JWT)
Nodemon (desarrollo)
Postman (para pruebas)

# ESTA ES UNA PRUEBA SOLO PARA EL STAGEG TEST
# Olvidé hacer este cambio