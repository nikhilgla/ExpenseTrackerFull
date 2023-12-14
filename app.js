const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const Expense = require('./models/expensetable');
const Users = require('./models/users');
const Order = require('./models/orders'); 
const Forgotpassword =require('./models/forgotpassword');

const cors = require('cors');

const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const signupRoutes = require('./routes/signupRoute');
const expenseRoutes = require('./routes/expenseRoute');
const purchaseRoutes = require('./routes/purchaseRoute');
const premiumRoutes = require('./routes/premiumRoute');
const forgotRoutes = require('./routes/forgotRoute')

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',signupRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',forgotRoutes);

Users.hasMany(Expense);
Expense.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

Users.hasMany(Forgotpassword);
Forgotpassword.belongsTo(Users);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
