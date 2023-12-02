const { where, INTEGER } = require('sequelize');
const Expense = require('../models/expensetable');
const User = require('../models/users');

exports.getData = async (req,res,next) =>{
    const data = await Expense.findAll({where : {userstableId : req.user.id}});
    // {where : {userstableId : req.user.id}}
    res.status(200).json({AllData:data , isPremium:req.user.ispremium});
};

exports.postData = async (req,res,next) =>{
    console.log(req.body);
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const data = await Expense.create({
      title: title,
      price: price,
      description: description ,
      userstableId: req.user.id
    }).then(console.log('new record created'))
    const newprice = Number(price) + req.user.totalAmount;
    await req.user.update({totalAmount : newprice });
    res.status(201).json({newUserDetail: data})
};

exports.deleteData = async (req,res,next) =>{
  console.log(req.params.delId);
  console.log(req.body)
  Expense.destroy({where : {id: req.params.delId , userstableId : req.user.id }})
  .then((noofrows)=>{
    if(noofrows === 0 ){
    return res.status(404).json({success:false , message : "Expense doesnt belong to the user"})
    }
    console.log("deleting");
    return res.status(202).json({success:true , message : "Expense is deleted successfuly"})
  })
  .catch((err)=>{
    console.log(err);
    return res.status(500).json({success:false , message : "not deleting some error"})
  })

  
};

exports.insertData = async (req,res,next) =>{
  console.log(req.params.insId);
  console.log(req.body)
  const item = await Expense.findByPk(req.params.insId);
  item.destroy();
  
  res.status(203).json({newUserDetail: item})
};