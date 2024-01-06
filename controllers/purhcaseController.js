const Order = require('../models/orders');
const Razorpay = require('razorpay');
const User = require('../models/users');

exports.buyPremium = async (req, res, next) => {
    console.log("inside premium controller");
    try {
        var rzp = new Razorpay({
            key_id: process.env.RZP_KEY,
            key_secret: process.env.RZP_SECRET
        })
        const amount = 2500;
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING' }).then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id });
            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch (err) {
        console.log(err);
    }
}

exports.updateStatus = async (req, res, next) => {
    console.log("inside update controller");


    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } })
        const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' })
        const promise2 = req.user.update({ ispremium: true })

        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({ success: true, message: "Transaction Successful" });
        }).catch((err)=>{
            throw new Error(err);
        })



    }
    catch (err) {
        console.log(err);
        
        res.status(403).json({ errpr: err, message: "Something went wrong" })
    }


}