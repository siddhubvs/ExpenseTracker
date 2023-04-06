const expense=require('../model/expense');

const User=require('../model/user');

const sequelize=require('../utils/database');

function isStringInvalid(str){
    if(str==undefined||str.length===0)
    return true;
    else
    return false;
}
exports.addExpense = async(req,res,next)=>{
    const t=await sequelize.transaction();
    const {amount,description,category} = req.body;
    try{
        if(isStringInvalid(amount) || isStringInvalid(description) || isStringInvalid(category)){
            return res.status(400).json({err:"Bad paramters : Something is missing"})
        }
        const data=await expense.create({amount,description,category,userId:req.user.id},{transaction:t});
        const totalExpense=Number(req.user.totalExpense)+Number(amount);
        await User.update({totalExpense:totalExpense},{where:{id:req.user.id},transaction:t});
        await t.commit();
        res.status(201).json({NewExpenseDetail:data});
    }catch(err){
        await t.rollback();
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
    const t=await sequelize.transaction();
    try{
    const expenseid=req.params.id;
    const Expense=await expense.findOne({where:{id:expenseid}});
    const totalExpense=Number(req.user.totalExpense)-Number(Expense.amount);
    await User.update({totalExpense:totalExpense},{where:{id:req.user.id},transaction:t})
    const response=await expense.destroy({where:{id:expenseid,userId:req.user.id},transaction:t})
    await t.commit();
    res.status(200).json({message:response})
    }catch(err){
    await t.rollback();
    console.log(err);
    }
}