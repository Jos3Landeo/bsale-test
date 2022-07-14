const express = require('express');
const app = express();
var routes = require('./routes/routes')

//Puerto localhost = 3000, de no ser asi tomara el del servidor
const port = process.env.PORT || 3000;


//Ruta de las apis, estas empezaran luego de /api/..
app.use('/api', routes)

app.get('/', function (req, res) {
    res.send('Apis Bsale..');
});

//Cors, permisos
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Listen
app.listen(port, () => {
    console.log("Servidor corriendo en puerto " + port);
});

//404
app.use((req, res) => {
    res.status(404).send('404 No se encontro')
})
//505
app.use(function(err, req, res, next) {
    res.status(500).send('Algo salio mal!');
  });