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

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoutes);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(6000);
  })
  .catch(err => {
    console.log(err);
  });
