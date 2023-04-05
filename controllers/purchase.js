const Order=require('../model/order');

const Razorpay=require('razorpay');

exports.purchasepremium=async(req,res)=>{
    try{
    var rzp=new Razorpay({
    key_id:'rzp_test_Z8AWNnBFuHJ9ov',
    key_secret:'9ztZWVNlm6E44pzy9XThsYCc'
    })
    const amount=2500
    rzp.orders.create({amount,currency:"INR"},(err,order)=>{
        if(err){
            throw new Error(JSON.stringify(err));
        }
        Order.create({orderid:order.id,status:'PENDING',userId:req.user.id})
        .then(()=>{
            return res.status(201).json({order,key_id:rzp.key_id})
        })
        .catch(err=>{throw new Error(err)})
    })
    }catch(err){
        res.status(500).json({message:'Something went wrong'});
    }
}
exports.updateTransactionStatus=async(req,res)=>{
    try{
    const{order_id,payment_id}=req.body;
    const order=await Order.findOne({where:{orderid:order_id}})
    const promise1=order.update({paymentid:payment_id,status:'successful'})
    const promise2=req.user.update({isPremiumUser:true})
    Promise.all([promise1,promise2]).then(()=>{
        return res.status(201).json({success:true,message:'Transaction successful'})
    })           
    .catch((err)=>{
    throw new Error(err);
    })
    }catch(err){
    res.status(500).json(err);
   }    
}
exports.failTransaction=async(req,res)=>{
    try{
    const{order_id}=req.body;
    const order=await Order.findOne({where:{orderid:order_id}})
    const promise1=order.update({status:'failed'})
    const promise2=req.user.update({isPremiumUser:false})
    Promise.all([promise1,promise2]).then(()=>{
        return res.status(201).json({success:true,message:'Transaction failed'})
    })           
    .catch((err)=>{
    throw new Error(err);
    })
    }catch(err){
    res.status(500).json(err);
   }    
}