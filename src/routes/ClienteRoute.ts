var express = require('express');
var router = express.Router();

// Require controller modules.
var cliente_controller = require('./../controllers/ClienteController');

router.post('/CrearCliente', cliente_controller.CrearCliente);

router.get('/GetCliente', cliente_controller.GetCliente);

router.post('/UpdateCliente', cliente_controller.UpdateCliente);

router.get('/GetServiciosCliente', cliente_controller.GetServiciosCliente);

router.post('/crearDireccionCliente', cliente_controller.crearDireccionCliente);

router.delete('/eliminarDireccionCliente', cliente_controller.eliminarDireccionCliente);

router.get('/GetAllClientes', cliente_controller.GetAllClientes);

router.get('/GetActivePlanCliente', cliente_controller.GetActivePlanCliente);

module.exports = router;