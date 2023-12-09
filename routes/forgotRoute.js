const path = require('path');

const express = require('express');

const forgotController = require('../controllers/forgotController');

const router = express.Router();

router.post('/password/forgotpassword', forgotController.forgotPass)


module.exports = router;