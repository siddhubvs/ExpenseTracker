const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const user=sequelize.define('user',{
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
    },
    password:Sequelize.STRING
})

module.exports=user;