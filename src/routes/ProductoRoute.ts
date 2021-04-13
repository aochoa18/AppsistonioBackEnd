var express = require('express');
var router = express.Router();

// Require controller modules.
var Productos_controller = require('./../controllers/ProductoController');

router.post('/CreateProducto', Productos_controller.CreateProducto);

router.post('/UpdateProducto', Productos_controller.UpdateProducto);

router.get('/GetProductos', Productos_controller.GetProductos);

router.get('/GetProductoById', Productos_controller.GetProductoById);

module.exports = router;