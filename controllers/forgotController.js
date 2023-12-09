require('dotenv').config()  

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;


exports.forgotPass = async(req,res,next)=>{
    console.log("inside forgot controller", req.body);
    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender= {
        email : 'nikhil.baghel.365@gmail.com'
    }
    const receivers =[
        {
            email :'nikhil.baghel.32@gmail.com'
        }
    ]
    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject:"your password broooo",
        textContent : 'haa bhai haa x2'
    }).then(console.log()).catch(console.log())
    

    return res.status(200).json({message:"done"})
};