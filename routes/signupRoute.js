const path = require('path');

const express = require('express');

const signupController = require('../controllers/signupController');

const router = express.Router();

//router.get('/user/booking', signupController.fas)

router.post('/expense/users', signupController.postData)


module.exports = router;