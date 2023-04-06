const express=require('express');

const router=express.Router();

const purchaseController=require('../controllers/purchase');

const auth=require('../middleware/auth')

router.get('/purchasePremium',auth.authenticate,purchaseController.purchasepremium);

router.post('/updatetransactionstatus',auth.authenticate,purchaseController.updateTransactionStatus);

router.post('/failtransaction',auth.authenticate,purchaseController.failTransaction);

module.exports=router;