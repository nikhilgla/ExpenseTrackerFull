const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const Expense = require('./models/expensetable');
const Users = require('./models/users');
const Order = require('./models/orders'); 


const cors = require('cors');

const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const signupRoutes = require('./routes/signupRoute');
const expenseRoutes = require('./routes/expenseRoute');
const purchaseRoutes = require('./routes/purchaseRoute');
const premiumRoutes = require('./routes/premiumRoute');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);

Users.hasMany(Expense);
Expense.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
