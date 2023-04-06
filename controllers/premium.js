const User=require('../model/user');

const Expense=require('../model/expense');

exports.showLeaderBoard=async(req,res)=>{
    try{
    const users=await User.findAll();

    const expenses=await Expense.findAll();

    const userExpenses={};

    expenses.forEach((expense)=>{
        if(userExpenses[expense.userId]){
            userExpenses[expense.userId]=userExpenses[expense.userId]+expense.amount;
        }
        else
        userExpenses[expense.userId]=expense.amount;
    })
     
    userLeaderboardDetails=[];
    users.forEach((user)=>{
        userLeaderboardDetails.push({name:user.name,TotalExpense:userExpenses[user.id]||0})
    })
    userLeaderboardDetails.sort((a,b)=>b.TotalExpense-a.TotalExpense);
    res.status(200).json(userLeaderboardDetails);
    }catch(err){
        res.status(500).json(err);
    }
}