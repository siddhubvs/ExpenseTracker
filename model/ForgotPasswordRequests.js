const Sequelize=require('sequelize')

const sequelize=require('../utils/database');

const ForgotPasswordRequests=sequelize.define('ForgotPasswordRequests',{
    id:{
        type:Sequelize.STRING,
        primaryKey:true,
    },
    isactive:Sequelize.STRING,
})

module.exports=ForgotPasswordRequests;