# Next.js Project

Este proyecto fue iniciado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), utilizando [Next.js](https://nextjs.org/).

## Cómo ejecutar el proyecto localmente

Para ejecutar el proyecto en tu entorno de desarrollo local, sigue estos pasos:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Librerías Utilizadas

Este proyecto hace uso de las siguientes librerías:

- [Next.js](https://nextjs.org/): Framework de React para producción.
- [Material-UI](https://mui.com/): Librería de componentes de React para un desarrollo más rápido y fácil.
- [Fake Store API](https://fakestoreapi.com/): API falsa para simulación de tiendas en línea.
- [Swiper](https://swiperjs.com/): Moderno deslizador de JavaScript con transiciones de hardware aceleradas.

## Puntos Cubiertos

- **Uso de Next.js**: Creación de un proyecto Next.js siguiendo la documentación oficial.
- **Consumo de API**: Solicitudes a la API de Fake Store para obtener datos de productos, utilizando métodos como GET, PUT, PATCH, POST, y DELETE.
- **Renderizado de Productos**: Visualización de una lista de productos a la venta, incluyendo detalles como nombre, precio, descripción y categoría.
- **Navegación por Categorías**: Filtrado de productos por categoría mediante una barra de navegación o menú desplegable.
- **Estilos CSS**: Uso de SCSS y Material-UI para mejorar la interfaz de usuario.
- **Detalles del Producto**: Página de detalles para cada producto, con información ampliada, imágenes y opción para editar el producto.
- **Agregar Productos**: Funcionalidad para añadir nuevos productos desde la página principal, con campos obligatorios como nombre, precio, descripción y categoría.

## Persistencia de Datos y Pruebas Unitarias

- **Persistencia de Datos**: Implementación de persistencia de datos utilizando `localStorage` para mantener la información de los productos entre sesiones.
- **Pruebas Unitarias**: Se han agregado pruebas unitarias para asegurar la calidad del código. Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm run test
```

## Funcionamiento del Proyecto

El proyecto ofrece una experiencia de usuario interactiva y funcionalidades específicas que mejoran la navegación y la gestión de productos. A continuación, se detallan las características principales del funcionamiento del proyecto:

- **Búsqueda por Categorías**: Los usuarios pueden buscar productos por categorías utilizando el menú disponible en el navbar. Esto permite una navegación más rápida y eficiente, facilitando a los usuarios encontrar lo que buscan de acuerdo a sus necesidades específicas.

- **Añadir Nuevos Productos**: Se ofrece la posibilidad de añadir nuevos productos a la tienda. Al añadir un producto, el usuario debe proporcionar información esencial como el nombre, precio, descripción y categoría del producto. Estos nuevos productos se guardan en `localStorage`, permitiendo una persistencia de datos a pesar de no contar con una base de datos persistente. Esto es especialmente útil para simular la funcionalidad de una tienda en línea sin necesidad de una infraestructura de backend compleja.

- **Editar Productos**: Los usuarios tienen la capacidad de editar cualquier producto existente. Esto incluye modificar cualquier aspecto del producto, como su nombre, precio, descripción, o categoría. Las modificaciones se reflejan inmediatamente en la interfaz de usuario y se guardan en `localStorage`, asegurando que los cambios persistan entre sesiones.

Estas funcionalidades están diseñadas para ofrecer una experiencia de usuario completa y satisfactoria, permitiendo una gestión eficaz de los productos en la tienda en línea simulada.

- Al hacer click en la card, redirecciona al detalle del producto.
- En los detalles del producto, hay un botón para ir a la página anterior donde se muestran todos los productos.
- Cada vez que se hace una petición POST o PATCH, se muestra un alert para ver si la respuesta es correcta o no.
