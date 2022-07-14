const express = require('express');
var cors = require('cors')
const app = express();
var routes = require('./routes/routes')

//Puerto localhost = 3000, de no ser asi tomara el del servidor
const port = process.env.PORT || 3000;

//Cors, permisos
app.use(cors())

//Ruta de las apis, estas empezaran luego de /api/..
app.use('/api', routes)

app.get('/', function (req, res) {
    res.send('Apis Bsale..');
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