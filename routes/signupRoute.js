const path = require('path');

const express = require('express');

const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');

const router = express.Router();

//router.get('/user/booking', signupController.fas)

router.post('/expense/users', signupController.postData)

router.post('/expense/login' , loginController.checkData )


module.exports = router;