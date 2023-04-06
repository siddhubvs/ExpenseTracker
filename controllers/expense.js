const expense=require('../model/expense');

const User=require('../model/user');

exports.addExpense = async(req,res,next)=>{
    try{
        const {amount,description,category} = req.body;
        const totalExpense=Number(req.user.totalExpense)+Number(amount);
        await User.update({totalExpense:totalExpense},{where:{id:req.user.id}});
        const data=await expense.create({amount,description,category,userId:req.user.id});
        res.status(201).json({NewExpenseDetail:data});
    }catch(err){
        res.status(500).json(err);
    }
}

exports.getExpense = async(req,res,next)=>{
    try{
        const data= await expense.findAll({where:{userId:req.user.id}});
        res.status(200).json({AllExpenseDetail:data});
    }catch(err){
        res.status(500).json(err);
    }
}

exports.deleteExpense = async(req,res,next)=>{
    try{
    const expenseid=req.params.id;
    const response=await expense.destroy({where:{id:expenseid,userId:req.user.id}})
    res.status(200).json({message:response})
    }catch(err){
    console.log(err);
    }
}