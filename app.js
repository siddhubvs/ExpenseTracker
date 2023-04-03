const express=require('express')

const app=express()

const bodyparser=require('body-parser')

const cors=require('cors')

const sequelize=require('./utils/database')

const user=require('./model/user');

user.sync();

app.use(cors());

app.use(bodyparser.json({extended:false}))

app.post('/user/signup',async(req,res,next)=>{
    try{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    const data=await user.create({name:name,email:email,password:password})
    res.status(201).json({newUserDetail:data})
    }
    catch(err){
        console.log(err);
        res.send('Error:Request failed with status code 403');
    }
})

sequelize.sync()
.then(result=>{
    app.listen(4000)
})
.catch(err=>console.log(err));