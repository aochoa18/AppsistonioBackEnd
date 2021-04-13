var express = require('express');
var router = express.Router();

// Require controller modules.
var domiciliario_controller = require('./../controllers/DomiciliarioController');

router.post('/CrearDomiciliario', domiciliario_controller.CrearDomiciliario);

router.get('/GetDomiciliario', domiciliario_controller.GetDomiciliario);

router.get('/GetAllDomiciliarios', domiciliario_controller.GetAllDomiciliarios);

router.post('/UpdateDomiciliario', domiciliario_controller.UpdateDomiciliario);

router.get('/GetDomiciliarioPos', domiciliario_controller.GetDomiciliarioPos);

router.get('/GetServiciosDomiciliario',domiciliario_controller.GetServiciosDomiciliario);

router.post('/CreateDomicilarioProducto', domiciliario_controller.CreateDomicilarioProducto);

router.post('/UpdateDomicilarioProducto', domiciliario_controller.UpdateDomicilarioProducto);

router.get('/GetProductosByIdDomiciliario',domiciliario_controller.GetProductosByIdDomiciliario);

router.get('/GetDomiciliariosByProducto',domiciliario_controller.GetDomiciliariosByProducto)

module.exports = router;