const Sequelize =  require('sequelize');

const sequelize = new Sequelize('expensetracker' , 'root' , process.env.MYSQL_PASS, {
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;