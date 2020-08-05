const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('./database/config');

// crear el servidor de express
const app = express();

// base de datos
dbConnection();

// los cors sirven para restringuir cosas, para dejar pasar al api a los usuarios que provienen de ciertos dominios, es una capa de seguiridad
app.use(cors());

// directorio publico, el use es un middleware, un middleware es una funcion que se ejecuta cuando alguien hace una petion al servidor 
app.use(express.static('public'));

// lectura y parseo del body
app.use(express.json());

// rutas
// todo auth crear, login, review
// todo crud eventos
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// escuchar las peticiones
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
});


// db: user_calendar
// de pass: A41CWsxyLHYjLD52

// OAgkDviudtyTSjEN

// mongodb+srv://dbcalendar:<password>@cluster0.fsjk0.mongodb.net/test