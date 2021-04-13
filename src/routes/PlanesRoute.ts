var express = require('express');
var router = express.Router();

// Require controller modules.
var planes_controller = require('./../controllers/PlanesController');

router.get('/GetAllPlanes', planes_controller.GetAllPlanes);

router.get('/GetPlanById', planes_controller.GetPlanById);

router.post('/CreatePlan', planes_controller.CreatePlan);

router.post('/UpdatePlan', planes_controller.UpdatePlan);

module.exports = router;