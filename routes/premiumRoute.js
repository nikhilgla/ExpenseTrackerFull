const path = require('path');

const express = require('express');

const premiumController = require('../controllers/premiumController');
const userauthentication =require('../middleware/auth');

const router = express.Router();

router.get('/premium/showleader', userauthentication.authenticate , premiumController.getLeaders)

// router.post('/purchase/updatetransactionstatus' , userauthentication.authenticate , purchaseController.updateStatus )


module.exports = router;