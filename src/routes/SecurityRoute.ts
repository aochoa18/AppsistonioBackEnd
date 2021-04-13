var express = require('express');
var router = express.Router();

// Require controller modules.
var security_controller = require('./../controllers/SecurityController');

router.post('/login', security_controller.login)

router.post('/logout', security_controller.logout)

router.post('/UpdatePwd', security_controller.UpdatePwd)
router.post('/RecoverPwd', security_controller.RecoverPwd)

router.post('/UpdatePushToken', security_controller.UpdatePushToken)

module.exports = router;