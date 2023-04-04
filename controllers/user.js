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
exports.login = async(req,res,next)=>{
    const {email,password}=req.body;
    if(isStringInvalid(email) || isStringInvalid(password)){
        return res.status(400).json({err:"Email or password is missing"})
    }
    user.findAll({where:{email}}).then(user=>{
            
        if(user.length>0){
        if(user[0].password===password)
            res.status(200).json({success:true,message:'User login successful'});
        else
            return res.status(401).json({success:false,message:'User not authorized'});
        }
        else{
            return res.status(404).json({success:false, message:'User not found'})
            }
        }).catch(error=>{res.status(500).json({message:error})})
    }
    
