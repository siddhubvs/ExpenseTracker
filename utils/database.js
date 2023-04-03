const Sequelize=require('sequelize')

const sequelize=new Sequelize('expense','root','siddhu2001',
{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;