const User = require('../models/users')
const Expense = require('../models/expensetable');
const sequelize = require('../util/database');



exports.getLeaders = async (req, res, next) => {
    console.log("inside leaderboard controller");
    try {
        // const users = await User.findAll();
        // const expenses = await Expense.findAll();

        // var userAggregatedExpenses = {};
        // expenses.forEach(expense => {

        //     if (userAggregatedExpenses[expense.userstableId]) {
        //         userAggregatedExpenses[expense.userstableId] = userAggregatedExpenses[expense.userstableId] + expense.price;
        //     }
        //     else {
        //         userAggregatedExpenses[expense.userstableId] = expense.price;
        //     }            
        // })
        // console.log(userAggregatedExpenses);

        // var userLeaderDetails = [];
        // users.forEach(user => {
        //     userLeaderDetails.push({name:user.name , totalAmount:userAggregatedExpenses[user.id] || 0  })
        // });
        // userLeaderDetails.sort((a,b)=> b.totalAmount - a.totalAmount )

        const leaderboardofusers = await User.findAll({
            attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expensetables.price')), 'totalAmount']],
            include: [
            {
            model: Expense, attributes: []
            }
            ],
            group: ['userstable.id'], order: [['totalAmount', 'DESC']]
            })

        res.status(200).json({leaderDetails :leaderboardofusers});

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

};
