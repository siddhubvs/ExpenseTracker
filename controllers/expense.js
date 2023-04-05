const expense=require('../model/expense');


exports.addExpense = async(req,res,next)=>{
    try{
        const {amount,description,category} = req.body;
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
    const response=await expense.destroy({where:{id:expenseid}})
    res.status(200).json({message:'Successfully destroyed'})
    }catch(err){
    console.log(err);
    }
}