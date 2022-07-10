const express = require('express');
const querys = require('./service/querysdb')
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// Frontend Route
app.use('/', express.static(path.join(__dirname, '/public/')));

//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.listen(port, () => {
    console.log("Servidor corriendo en puerto " + port);
});
app.get('/products', async (req, res) => {
    res.json(await querys.getProducts(req.query));
})
app.get('/products/:name', async (req, res) => {
    const {name} = req.params;
    res.json(await querys.getProductByName(name));
})
app.get('/categories', async (req, res) => {
    res.json(await querys.getCategories(req.query));
})
app.get('/category/:name', async (req, res) => {
    const {name} = req.params;
    res.json(await querys.getProductByCategory(name));
})

//404 error
app.use((req, res) => {
    res.status(404).send('404 not found')
})