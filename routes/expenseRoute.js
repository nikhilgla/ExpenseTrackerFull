const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expenseController');
const userauthentication =require('../middleware/auth');

const router = express.Router();

router.get('/data', userauthentication.authenticate , expenseController.getData)

router.post('/data' , userauthentication.authenticate , expenseController.postData )

router.delete('/data/:delId' , userauthentication.authenticate , expenseController.deleteData);

router.post('/data/ins/:insId' , userauthentication.authenticate , expenseController.insertData);


module.exports = router;