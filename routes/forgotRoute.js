const path = require('path');

const express = require('express');

const forgotController = require('../controllers/forgotController');

const router = express.Router();

router.post('/forgotpassword', forgotController.forgotPass)

router.get('/updatepassword/:resetpasswordid', forgotController.updatepassword)

router.get('/resetpassword/:id', forgotController.resetpassword)


module.exports = router;