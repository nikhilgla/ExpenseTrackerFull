const { where, INTEGER } = require('sequelize');
const Expense = require('../models/expensetable');
const User = require('../models/users');
const sequelize = require('../util/database');

exports.getData = async (req, res, next) => {
  console.log(req.query);
  const page = req.query.page;
  const lmt = req.query.limit;

  const data = await Expense.findAll({
    where: { userstableId: req.user.id },
    offset: (page-1)*lmt ,
    limit: Number(lmt)
  });
  // {where : {userstableId : req.user.id}}
  res.status(200).json({ AllData: data, isPremium: req.user.ispremium });
};

exports.postData = async (req, res, next) => {
  const t = await sequelize.transaction();
  console.log(req.body);
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const dataa = await Expense.create({
    title: title,
    price: price,
    description: description,
    userstableId: req.user.id
  },
    { transaction: t }
  ).then(async (data) => {
    console.log('new record created');
    const newprice = Number(price) + req.user.totalAmount;
    await req.user.update({ totalAmount: newprice }, { transaction: t }).then(async () => {
      await t.commit();
      res.status(201).json({ newExpenseDetail: data })
    }).catch(async (err) => {
      await t.rollback();
      return res.status(500).json({ success: false, error: err });
    })
  }).catch(async (err) => {
    await t.rollback();
    return res.status(500).json({ success: false, error: err });
  })

};

exports.deleteData = async (req, res, next) => {
  const t = await sequelize.transaction();
  console.log(req.params.delId);
  const item = await Expense.findByPk(req.params.delId);
  Expense.destroy({ where: { id: req.params.delId, userstableId: req.user.id } }, { transaction: t }).then(async (noofrows) => {
    if (noofrows === 0) {
      return res.status(404).json({ success: false, message: "Expense doesnt belong to the user" })
    }
    console.log("deleting");
    const newprice = req.user.totalAmount - Number(item.price);
    console.log(newprice);
    await req.user.update({ totalAmount: newprice }, { transaction: t }).then(async () => {
      await t.commit();
      return res.status(202).json({ success: true, message: "Expense is deleted successfuly" })
    }).catch(async (err) => {
      await t.rollback();
      return res.status(500).json({ success: false, error: err });
    })

  })
    .catch(async (err) => {
      console.log(err);
      await t.rollback();
      return res.status(500).json({ success: false, message: "not deleting some error" })
    })


};

exports.insertData = async (req, res, next) => {
  console.log(req.params.insId);
  console.log(req.body)
  const item = await Expense.findByPk(req.params.insId);
  item.destroy();

  res.status(203).json({ newUserDetail: item })
};