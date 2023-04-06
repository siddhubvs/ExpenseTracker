const User=require('../model/user');

const Expense=require('../model/expense');
const sequelize = require('../utils/database');

exports.showLeaderBoard=async(req,res)=>{
    try{
    const leaderboardofUsers=await User.findAll({
        attributes:['id','name','totalExpense'],
    });
    
    res.status(200).json(leaderboardofUsers);
    }catch(err){
        res.status(500).json(err);
    }
}