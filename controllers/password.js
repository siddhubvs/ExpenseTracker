const User=require('../model/user');

const Sib=require('sib-api-v3-sdk');

require('dotenv').config();

exports.forgotPassword=async(req,res)=>{
const {email}=req.body;
    
const client=Sib.ApiClient.instance;

const apiKey=client.authentications['api-key']

apiKey.apiKey=process.env.API_KEY;

const tranEmailApi=new Sib.TransactionalEmailsApi();

const sender={
    email:'siddhuxyz9@gmail.com'
}
const receivers=[
    {
        email:email
    }
]
tranEmailApi.sendTransacEmail({
    sender,
    to:receivers,
    subject:'Set your password',
    textContent:'You can reset your password'
}).then(()=>res.status(201).json({message:'Mail sent successfully'}))
.catch(console.log)
}