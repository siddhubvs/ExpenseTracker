const express=require('express');

const auth=require('../middleware/auth');


const router=express.Router();

const expenseController=require('../controllers/expense');

router.post('/add',auth.authenticate,expenseController.addExpense);

router.get('/',auth.authenticate,expenseController.getExpense);

router.delete('/delete/:id',auth.authenticate,expenseController.deleteExpense);

module.exports=router;