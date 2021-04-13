var express = require('express');
var router = express.Router();

// Require controller modules.
var servicio_controller = require('./../controllers/ServicioClienteController');

router.post('/CrearServicioCliente', servicio_controller.CrearServicioCliente);

router.get('/GetServicioClienteById', servicio_controller.GetServicioClienteById);

router.get('/GetServiciosByIdEstado', servicio_controller.GetServiciosByIdEstado);

router.post('/UpdateServicioCliente', servicio_controller.UpdateServicioCliente);

router.post('/UpdatePagoCliente', servicio_controller.UpdatePagoCliente);

router.post('/CreatePlanCliente', servicio_controller.CreatePlanCliente);

module.exports = router;