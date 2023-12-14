require('dotenv').config()

const uuid = require('uuid');
const bcrypt = require('bcrypt');

const User = require('../models/users');
const Forgotpassword = require('../models/forgotpassword');

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;


exports.forgotPass = async (req, res, next) => {
    console.log("inside forgot controller", req.body);
    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const user = await User.findOne({ where: { email:req.body.email } });
    if (user) {
        const id = uuid.v4();
        user.createForgotpassword({ id, active: true })
            .catch(err => {
                throw new Error(err)
            })

        const sender = {
            email: 'nikhil.baghel.365@gmail.com'
        }
        const receivers = [
            {
                email: req.body.email
            }
        ]
        tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "your password broooo",
            textContent: 'haa bhai haa x2 still trying',
            htmlContent: `<a href="http://localhost:5000/password/resetpassword/${id}">Reset password</a>`
        }).then(console.log()).catch(console.log())


        return res.status(200).json({ message: "open your mail and click on the link to reset password" })
    } else {
        throw new Error('User doesnt exist')
    }
};

exports.resetpassword = async (req, res) => {
    console.log("inside reset password");

    const id = req.params.id;
    Forgotpassword.findOne({ where: { id } }).then(forgotpasswordrequest => {
        if (forgotpasswordrequest) {
            forgotpasswordrequest.update({ active: false });
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
            )
            res.end()

        }
    })
}

exports.updatepassword = async (req, res) => {
    console.log("inside update password");
    // console.log(req.body,req.params);
    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpassword.findOne({ where: { id: resetpasswordid } }).then(resetpasswordrequest => {
            User.findOne({ where: { id: resetpasswordrequest.userstableId } }).then(user => {
                // console.log('userDetails', user)
                if (user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        if (err) {
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function (err, hash) {
                            // Store hash in your password DB.
                            if (err) {
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({ message: 'Successfuly update the new password' })
                            })
                        });
                    });
                } else {
                    return res.status(404).json({ error: 'No user Exists', success: false })
                }
            })
        })
    } catch (error) {
        return res.status(403).json({ error, success: false })
    }

}