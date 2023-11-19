const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/expense/data', expenseController.getData)

router.post('/expense/data' , expenseController.postData )

router.delete('/expense/data/:delId' , expenseController.deleteData);

router.post('/expense/data/ins/:insId' , expenseController.insertData);


module.exports = router;