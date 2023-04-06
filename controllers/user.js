const user=require('../model/user');

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

function isStringInvalid(str){
    if(str==undefined||str.length===0)
    return true;
    else
    return false;
}
   async function signup(req,res,next){
    const {name,email,password}=req.body;

    if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password)){
        return res.status(400).json({err:"Bad paramters : Something is missing"})
    }
    try{
    bcrypt.hash(password,10,async(err,hash)=>{
    const data=await user.create({name,email,password:hash})
    res.status(201).json({message:'Successfully created new user'});
    })
    }
    catch(err){
    res.status(500).json(err)
    }
}

function tokengenerator(id,name,isPremiumUser){
    return jwt.sign({userId:id,name:name,isPremiumUser},'6EA8777E4552DBA715A5EE1D144A2');
}
async function login(req,res,next){
    const {email,password}=req.body;
    if(isStringInvalid(email) || isStringInvalid(password)){
        return res.status(400).json({err:"Email or password is missing"})
    }
    user.findAll({where:{email}}).then(user=>{
        
        if(user.length>0){
        bcrypt.compare(password,user[0].password,async(err,result)=>{
        if(err){
            throw new Error('Something went wrong');
        }
        if(result===true)
        res.status(200).json({success:true,message:'User login successful',token:tokengenerator(user[0].id,user[0].name,user[0].isPremiumUser)});
        else
        return res.status(401).json({success:false,message:'User not authorized'});
        })
        }       
        else{
            return res.status(404).json({success:false, message:'User not found'})
        }
        }).catch(error=>{res.status(500).json({message:error})})
}
module.exports={
    signup,
    tokengenerator,
    login
}    
