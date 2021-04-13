var express = require('express');
var router = express.Router();

// Require controller modules.
var global_controller = require('./../controllers/GolbalController');

router.get('/GetParameters', global_controller.GetParameters)

router.post('/RequestOTP', global_controller.RequestOTP)

router.post('/CambiarEstadoDepartamento', global_controller.CambiarEstadoDepartamento)

router.post('/CambiarEstadoMunicipio', global_controller.CambiarEstadoMunicipio)

router.get('/GetDepartamentos', global_controller.GetDepartamentos)

module.exports = router;