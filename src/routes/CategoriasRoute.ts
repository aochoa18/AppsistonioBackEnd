var express = require('express');
var router = express.Router();

// Require controller modules.
var categorias_controller = require('./../controllers/CategoriasController');

router.post('/CreateCategoria', categorias_controller.CreateCategoria);

router.post('/UpdateCategoria', categorias_controller.UpdateCategoria);

router.get('/GetCategorias', categorias_controller.GetCategorias);

router.get('/GetCategoriaById', categorias_controller.GetCategoriaById);
/*
router.post('/CreateSubCategoria', categorias_controller.CreateSubCategoria);

router.post('/UpdateSubCategoria', categorias_controller.UpdateSubCategoria);

router.get('/GetSubCategorias', categorias_controller.GetSubCategorias);

router.get('/GetSubCategoriaById', categorias_controller.GetSubCategoriaById);
*/
module.exports = router;