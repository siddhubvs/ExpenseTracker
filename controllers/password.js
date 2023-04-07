const User=require('../model/user');

const bcrypt = require('bcrypt');

const path=require('path');
const ForgotPasswordRequests=require('../model/ForgotPasswordRequests');

const {v4 : uuidv4} = require('uuid')

const Sib=require('sib-api-v3-sdk');

require('dotenv').config();


exports.forgotPassword=async(req,res)=>{
try{
const {email}=req.body;

User.findAll({where:{email}}).then(async (user)=>{

console.log(user[0].id);

const UserId = uuidv4();

const response=await ForgotPasswordRequests.create({id:UserId,isactive:'true',userId:user[0].id});

console.log(response);
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

console.log(UserId);
   tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:'Reset your password',
        textContent:`http://localhost:4000/password/resetpassword/${UserId}`,
    }).then(()=>res.status(201).json({message:response.dataValues})) 


})
}catch(err){
    res.status(500).json(err)
}
}

exports.resetPassword=async(req,res)=>{
const id=req.params.id;
ForgotPasswordRequests.findOne({where:{id}}).then(forgotpasswordrequest => {
    if(forgotpasswordrequest){
    forgotpasswordrequest.update({ active: false});
    res.status(200).send(`<html><script>function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                        )
            res.end()

        }
    })
    
}

exports.updatePassword=async(req,res)=>{
    try{
    const {newpassword} = req.query;
    const {resetpasswordid} = req.params;
    ForgotPasswordRequests.findOne({where:{id:resetpasswordid}}).then(resetpasswordrequest => {
    User.findOne({where:{id:resetpasswordrequest.userId}}).then(user => {
        if(user){
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword,salt,function(err, hash) {
                                if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({password:hash}).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }
}
