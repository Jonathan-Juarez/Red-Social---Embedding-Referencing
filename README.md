#API básica en Node.js con Express y MongoDB

##Funcionamiento:

El funcionamiento de este trabajo se comporta de la misma forma que la anterior API, sin embargo, se implementa el método de embedding y referecing para mejorar la estrucuta y eficientar las consultas de la API. De pricipio hay que crear un .env para agregar la dirección URL de la base de datos (DB)La estructura se encuentra con el config que conecta al servidor local mongoDB, los modelos que poseen la estructura del documento de dica colección, los controladores que contienen las funciones del CRUD y se exporta para que el enrutador proporcione rutas que utilizará el servidor que permitirá usar el API. Para agregar documentos se realiza por medio de Thunder Client.

##Tecnologías empleadas:

Se utiliza Node.js es un entorno de ejecución de JavaScript.
Ahora, en vez de usar mongodb, se usa mongoose.
Se consulta a diversas páginas web para conocer un poco más sobre mongoose y su aplicamiento en código. A continuacion las fuentes:


[freecodecamp](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)

[texcode Tutsplust](https://code.tutsplus.com/es/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527a)

##Imágenes Thunder Client:

Crear un usuario.
![createUserWithoutGroup](/assets/createUserWithoutGroup.png)

Visualización en Compass de crear un usuario.
![createUserWithoutGroupCompass](/assets/createUserWithoutGroupCompass.png)

Crear un grupo.
![createGroup](/assets/createGroup.png)

Visualización en Compass de crear un grupo.
![createGroupCompass](/assets/createGroupCompass.png)

Buscar un usuario (se agregó el grupo al crear el grupo y referenciar el usuario).
![findUserWithGroup](/assets/findUserWithGroup.png)

Visualización en Compass de buscar un usuario.
![findUserWithGroupCompass](/assets/findUserWithGroupCompass.png)

Crear un evento.
![deleteEvent](/assets/createEvent.png)

Visualización en Compass de crear un evento.
![deleteEventCompass](/assets/createEventCompass.png)

Visualización en Compass de buscar un grupo tras agregar eventos (se agregan los ObjetctID de los eventos).
![deleteEventCompass](/assets/findGroupCompass.png)

Eliminar un evento.
![deleteEvent](/assets/deleteEvent.png)

Visualización en Compass de eliminar un evento.
![deleteEventCompass](/assets/deleteEventCompass.png)

Actualizar un evento.
![updateEvent](/assets/updateEvent.png)

Visualización en Compass de eliminar un evento.
![updateEventCompass](/assets/updateEventCompass.png)


##Manual de instalación:

```npm  init —yes```  Para inicializar. El —yes es para que todo lo que pregunte al ejecutarlo, automáticamente seleccione “yes”.

```npm install express mongooose dotenv nodemon -D``` mongoose gestiona las relaciones entre los datos, proporciona validación de esquemas y se utiliza para traducir entre objetos en código y la representación de esos objetos en MongoDB. express permite manejar rutas y peticiones en el servidor. dontev carga variables de entorno desde un archivo .env. nodemon -D para actualizar automáticamente.

```npm run dev``` Para conectarse al servidor, teniendo previa configuración en los scripts.

###Justificación de modelado:

La estructura de la API de red social fue definida por el docente, donde se tomaron en cuenta los usuarios, grupos y eventos. En cada modelo se definieron puntos principales y se les asignó un alias para poder referenciarlos entre otros esquemas: 
El usuario posee nombre, correo, contraseña y un grupo al que pertenece, el cual tiene la capacidad de pertenecer a más de uno por medio de una referencia ObjectID. 
El grupo posee nombre, un apartado para describir de qué consiste el grupo, los miembros que forman parte del grupo, por lo que es una relación muchos a muchos y los eventos.
El evento posee nombre, descripción, ubicación donde se desarrolla el evento y los participantes del evento, donde se referencia a los usuarios y se asigna el estado que tienen en el evento, ya sea que esté inscrito, esté pendiente o falte por inscribirse y cuál será su rol.

Definí esta estructura para poder relacionar los datos ingresados. Se realiza el CRUD normal, pero en el create se encuentra la relación, por ejemplo cuando se crea un grupo y se ingresa un usuario, tanto el modelo de usuario como el de grupo tendrán los objectID relacionados, al igual cuando se crea un evento. Esto fue realizado para evitar estar asignando manualmente esa relación, lo cual fue asignado en la funcion create de cada uno, utilizando el _id que devuelve cada modelo y asignándolo en el otro campo.