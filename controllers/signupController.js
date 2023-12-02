const Users = require('../models/users');
const bcrypt  = require('bcrypt');

exports.postData = async (req,res,next)=>{
    console.log(req.body , "is being created as new user");

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
     
    const saltrounds =10;

    bcrypt.hash(password , saltrounds , async(err , hash) =>{
      console.log(err);
      const data = await Users.create({
        name: name,
        email: email,
        ispremium :false,
        totalAmount : 0,
        password:hash
      }).then(console.log('new User created')).catch((err) => { console.log(err); })
      res.status(201).json({newUserDetail: data})

    })

};