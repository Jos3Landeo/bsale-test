var express = require('express');
var ProyectController = require('../controller/project');

var router = express.Router();

router.get('/products', ProyectController.products);
router.get('/product/:name', ProyectController.product);
router.get('/categories', ProyectController.categories);
router.get('/category/:name', ProyectController.category);

module.exports = router;
