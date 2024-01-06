const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateAccessToken(id){
    return jwt.sign({userId : id} , process.env.JWT_KEY)//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
}

exports.checkData = async (req, res, next) => {
    console.log(req.body ,  "is being checked in login controller");

    //const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // const data = await Users.create({
    //   name: name,
    //   email: email,
    //   password: password
    // }).then(console.log('new User created')).catch((err) => { console.log(err); })

    const data = await Users.findAll({ where: { email: email } })

    // console.log(data);
    try {
        if (data[0] == null) {
            return res.status(404).json({success:false , message: "not found" })
        }
        else {
            bcrypt.compare(password, data[0].password, (err, ress) => {
                if (ress === true) {
                    console.log("found it");
                    return res.status(202).json({success:true , message: "User Login Successful" , token : generateAccessToken(data[0].id)});
                }
                else {
                    console.log("not found");
                    return res.status(401).json({success:false , message: "User not Authorized" });
                }
            })

        }
    }
    catch (err) {
        console.log(err);
    }


};