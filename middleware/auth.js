const user=require('../model/user');

const jwt=require('jsonwebtoken');

exports.authenticate=async(req,res,next)=>{
    try{
    const token=req.header('Authorisation');
    console.log(token);
    const User=jwt.verify(token,'6EA8777E4552DBA715A5EE1D144A2');
    user.findByPk(User.userId).then(user=>{
        req.user=user;
        next();
    })
   }catch(err){
    res.status(500).json(err);
   }

}