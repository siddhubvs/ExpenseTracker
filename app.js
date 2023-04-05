const express=require('express')

const app=express()

const bodyparser=require('body-parser')

const cors=require('cors')

const sequelize=require('./utils/database')

const user=require('./model/user');

const expense=require('./model/expense');

const userRoutes=require('./routes/user')

const expenseRoutes=require('./routes/expense');

user.sync();

expense.sync();

app.use(cors());

app.use(bodyparser.json({extended:false}))

app.use('/user',userRoutes);

app.use('/expense',expenseRoutes);
sequelize.sync()
.then(result=>{
    app.listen(4000)
})
.catch(err=>console.log(err));