const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

//configuracion
// configurando el puerto
app.set('port', process.env.PORT || 4000);

//para el error corse en el navegador 
app.use(cors());

// middlewares
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));

// hace log de cada petición
app.use(morgan('dev'));
// hace que express entienda JSON
app.use(express.json());
// Sirve para hacer que el body se reciba correctamente
app.use(bodyParser.urlencoded({ extended: false }));

//Rutas
app.use('/api/tienda', require('./routes/RTregistro.js'));
app.use('/api/tienda', require('./routes/RTautenticacion.js'));
// Estáticos
//no es necesario


// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})

