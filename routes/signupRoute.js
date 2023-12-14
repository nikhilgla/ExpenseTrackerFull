const path = require('path');

const express = require('express');

const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/signup', signupController.postData)

router.post('/login' , loginController.checkData )


module.exports = router;