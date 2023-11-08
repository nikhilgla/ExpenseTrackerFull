const Sequelize =  require('sequelize');

const sequelize = new Sequelize('expensetracker' , 'root' , 'nikhilsql', {
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;