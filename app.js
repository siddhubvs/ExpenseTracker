const express=require('express')

const app=express()

const bodyparser=require('body-parser')

const cors=require('cors')

const sequelize=require('./utils/database')

const User=require('./model/user');

const Expense=require('./model/expense');

const Order=require('./model/order');

const ForgotPasswordRequests=require('./model/ForgotPasswordRequests');

const userRoutes=require('./routes/user')

const expenseRoutes=require('./routes/expense');

const purchaseRoutes=require('./routes/purchase');

const premiumRoutes=require('./routes/premium');

const passwordRoutes=require('./routes/password');

app.use(cors());

app.use(bodyparser.json({extended:false}))

app.use('/user',userRoutes);

app.use('/expense',expenseRoutes);

app.use('/purchase',purchaseRoutes);

app.use('/premium',premiumRoutes);

app.use('/password',passwordRoutes);
User.hasMany(Expense);

Expense.belongsTo(User);

User.hasMany(Order);

Order.belongsTo(User);

User.hasMany(ForgotPasswordRequests);

ForgotPasswordRequests.belongsTo(User);

sequelize.sync()
.then(result=>{
    app.listen(4000)
})
.catch(err=>console.log(err));