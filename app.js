const express=require('express')

const app=express()

const bodyparser=require('body-parser')

const cors=require('cors')

const sequelize=require('./utils/database')

const user=require('./model/user');

const userRoutes=require('./routes/user')

user.sync();

app.use(cors());

app.use(bodyparser.json({extended:false}))

app.use('/user',userRoutes);
sequelize.sync()
.then(result=>{
    app.listen(4000)
})
.catch(err=>console.log(err));