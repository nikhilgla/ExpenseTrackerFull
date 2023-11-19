const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const cors = require('cors');

const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const signupRoutes = require('./routes/signupRoute');
const expenseRoutes = require('./routes/expenseRoute');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoutes);
app.use(expenseRoutes);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
