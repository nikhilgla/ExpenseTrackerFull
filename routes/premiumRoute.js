const path = require('path');

const express = require('express');

const premiumController = require('../controllers/premiumController');
const reportController = require('../controllers/reportController');
const userauthentication =require('../middleware/auth');

const router = express.Router();

router.get('/showleader', userauthentication.authenticate , premiumController.getLeaders)

router.get('/downloadreport' , userauthentication.authenticate , reportController.downloadreport )

// router.post('/purchase/updatetransactionstatus' , userauthentication.authenticate , purchaseController.updateStatus )


module.exports = router;