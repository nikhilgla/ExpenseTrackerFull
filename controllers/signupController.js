const Users = require('../models/users');

exports.postData = async (req,res,next)=>{
    console.log(req.body , "abcd");

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const data = await Users.create({
      name: name,
      email: email,
      password: password
    }).then(console.log('new User created')).catch((err) => { console.log(err); })
    res.status(201).json({newUserDetail: data})

};