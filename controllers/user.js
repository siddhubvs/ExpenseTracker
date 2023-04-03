const user=require('../model/user');

function isStringInvalid(str){
    if(str==undefined||str.length===0)
    return true;
    else
    return false;
}
exports.signup= async(req,res,next)=>{
    const {name,email,password}=req.body;

    if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password)){
        return res.status(400).json({err:"Bad paramters : Something is missing"})
    }
    try{
    const data=await user.create({name,email,password})
    res.status(201).json({message:'Successfully created new user'});
    }
    catch(err){
    res.status(500).json(err)
    }
}