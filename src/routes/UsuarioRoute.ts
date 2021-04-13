var express = require('express');
var router = express.Router();

// Require controller modules.
var usuario_controller = require('./../controllers/UsuarioController');

router.post('/CrearUsuario',usuario_controller.CrearUsuario);

router.get('/GetUsuario', usuario_controller.GetUsuario);

router.get('/GetAllUsuarios', usuario_controller.GetAllUsuarios);

router.post('/UpdateUsuario',usuario_controller.UpdateUsuario);

module.exports = router;