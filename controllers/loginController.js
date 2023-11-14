const Users = require('../models/users');
const bcrypt = require('bcrypt');

exports.checkData = async (req, res, next) => {
    console.log(req.body, "abcd");

    //const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // const data = await Users.create({
    //   name: name,
    //   email: email,
    //   password: password
    // }).then(console.log('new User created')).catch((err) => { console.log(err); })

    const data = await Users.findAll({ where: { email: email } })

    console.log(data);
    try {
        if (data[0] == null) {
            res.status(404).json({ data: "not found" })
        }
        else {
            bcrypt.compare(password, data[0].password, (err, ress) => {
                if (ress === true) {
                    console.log("found it");
                    res.status(202).json({ data: "User Login Successful" });
                }
                else {
                    console.log("not found");
                    res.status(401).json({ data: "User not Authorized" });
                }
            })

        }
    }
    catch (err) {
        console.log(err);
    }


};