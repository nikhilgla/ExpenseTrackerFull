const path = require('path');

const express = require('express');

const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/user/signup', signupController.postData)

router.post('/user/login' , loginController.checkData )


module.exports = router;