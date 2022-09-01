# BACKEND: Proyecto E-Commerce
Bienvenidos. Este es un proyecto de e-commerce realizado para la entrega del curso de Backend de Coder House.

USUARIO ADMIN:
User: pepe
Contraseña: pepepass

Rutas y métodos disponibles:
"/api/" 
	- GET: Redirige a la tienda si se esta logeado, sino al login

"/api/productos/"
	- GET: Se obtienen todos los productos de la tienda
	- POST: Se agrega un producto al carrito del usuario loggeado
	- DELETE: Borra todos los carritos. **Solo para admin**

"/api/productos/cargar-productos/"
	- GET: Se obtienen todos los productos para la sección de carga de productos, **solo para admin**
	- POST: Se cargan productos, **solo para admin**

"/api/productos/:id"
	- GET: Se muestra un producto según el ID proporcionado
	- POST(*solo para vistas*) y PUT: Se modifica un producto, **solo para admin**
	- DELET: Borra producto elegido, **solo para admin**

"/api/productos/categoria/:category"
	- GET: Si se proporciona una categoría se muestran todos los productos que la comparten, si no coincide se muestran todos los productos

"/api/carrito/"
	- GET: Se obtiene el carrito, **se puede proporcionar id** al final de la ruta para ver otros carritos pero es una función **solo para admins**}
	- POST(*solo para vistas*) y DELETE: Se borra producto del carrito 

"/api/carrito/:idCart/checkout"
	- GET: Se va al checkOut para confirmar compra
	- POST: Se confirma y guarda la compra, se vacía el carrito y se envía mail confirmando compra

"/api/usuario/"
	- GET: Redirige al login

"/api/usuario/login/"
	- GET: Dirige al login
	- POST: Se realiza el post desde el Login
	- 
"/api/usuario/login/login-error"
	-GET: Se da error al dar datos erroneos al iniciar sesión

"/api/usuario/signup/"
	-GET: Se lleva al registro
	- POST: Se realiza el registro de los datos

"/api/usuario/login/login-error"
	- GET: Error cuando ya hay un usuario registrado con el mismo nombre

"/api/usuario/sesion"
	- GET: Se lleva al perfil de la sesion iniciada
	- POST: Se hace el post de la nueva imagen de perfil(por medio de la url de la imagen)

"/api/usuario/logout"
	-GET: Se realiza el logOut

"/api/usuario/privado"
	-GET: Se dirige a una sección solo disponible para admin

"/api/info"
	-GET: Se muestra información del servidor activo.

"/api/chat"
	-GET: Se dirige a un chat(no funcional)



Nota del desarrollador:
> Mi nombre es Gabriel Alejandro Sarmiento Lamas, Soy de Argentina, Buenos Aires. Estoy iniciandome en el desarrollo de páginas web, por lo que estos son mis primeros proyectos en este ámbito.
> Mi github es https://github.com/SarmientoLamasGA. Hasta el día de la fecha(31/8/2022) tengo tres repositorios subidos. Los mismos pertenecen a mis cursos de Coder House de Desarrollo Web y JavasCript respectivamente.

Para contactarse conmigo se puede realizar por:
Mail: sarmiento.lamas.g.a@gmail.com
