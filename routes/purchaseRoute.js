const path = require('path');

const express = require('express');

const purchaseController = require('../controllers/purhcaseController');
const userauthentication =require('../middleware/auth');

const router = express.Router();

router.get('/purchase/buypremium', userauthentication.authenticate , purchaseController.buyPremium)

router.post('/purchase/updatetransactionstatus' , userauthentication.authenticate , purchaseController.updateStatus )


module.exports = router;