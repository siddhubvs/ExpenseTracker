const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const user=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    password:Sequelize.STRING
})



module.exports=user;