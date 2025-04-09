# Ecommerce de comida con gestión para usuarios y administradores - (Repositorio Frontend)

Este proyecto es una plataforma de ecommerce de comida desarrollada con un enfoque fullstack. Permite a los usuarios explorar un catálogo de productos, agregarlos a un carrito de compras, modificarlos o quitarlos, y realizar pedidos, en los cuáles solamente funcionaran mediante un sistema de pago con tarjeta de crédito o débito. La aplicación también incluye un panel administrativo donde se puede modificar el stock de un producto, y confirmar los pedidos realizados.

Útilizo Laravel Sanctum para la autenticación y la generación de tokens, una interfaz hecha con Tailwind CSS, y una arquitectura hecho con un patrón de diseño que mejora la mantenibilidad del código. Además, todo el proyecto está contenedizado con Docker.

# Autenticación
- Se usa Laravel Sanctum.
- El token se almacena en el frontend con LocalStorage.
- El token no tiene una expiración de tiempo limitada.

# Carrito
- Los productos se pueden añadir a un carrito.
- Tienen un límite de hasta 5 productos individuales.
- Se pueden modificar o borrar una vez añadidos al carrito.

# Sistema de pago
- El formulario de pago aparecerá una vez que hayan productos en el carrito.
- La validación simula inputs de tarjetas reales (numero de tarjeta, cvv, fecha de vencimiento, tipo de tarjeta)
- Es una migración distinta que saca el monto a través de una foreign key

# Desarrollo
- Backend: Laravel
- Frontend: React JS & TypeScript
- BD: MySQL
- Validaciones: Laravel validations, Custom Hooks
- Autenticación: Laravel Sanctum 
- UI: Taiwind CSS, Lucide Dev Icons
- Contenerización: Docker

# Imagenes del proyecto

![0](https://i.imgur.com/EcMfGaq.jpeg)
![1](https://i.imgur.com/9VoyAMi.jpeg)
![3](https://i.imgur.com/u3UOlEJ.jpeg)
![4](https://i.imgur.com/i5EkDKF.jpeg)
![5](https://i.imgur.com/mvlSfzU.jpeg)
![6](https://i.imgur.com/jfVVEuc.jpeg)
![7](https://i.imgur.com/ad4AFy7.jpeg)
![8](https://i.imgur.com/0lfzy9j.jpeg)
![9](https://i.imgur.com/WRL7ogu.jpeg)
![10](https://i.imgur.com/IE99UoT.jpeg)

