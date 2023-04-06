const express=require('express');

const auth=require('../middleware/auth');


const router=express.Router();

const premiumController=require('../controllers/premium');



router.get('/showleaderboard',auth.authenticate,premiumController.showLeaderBoard);


module.exports=router;