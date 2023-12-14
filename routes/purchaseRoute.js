const path = require('path');

const express = require('express');

const purchaseController = require('../controllers/purhcaseController');
const userauthentication =require('../middleware/auth');

const router = express.Router();

router.get('/buypremium', userauthentication.authenticate , purchaseController.buyPremium)

router.post('/updatetransactionstatus' , userauthentication.authenticate , purchaseController.updateStatus )


module.exports = router;