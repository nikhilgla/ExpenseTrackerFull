const Order = require('../models/orders');
const Razorpay = require('razorpay');
const User = require('../models/users');

exports.buyPremium = async (req, res, next) => {
    console.log("inside premium controller");
    try {
        var rzp = new Razorpay({
            key_id: "rzp_test_Wr4jQz26qILyi0",
            key_secret: "3WANFA1gM8b1ZqsXUaSdsJbI"
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
        Order.findOne({ where:{ orderid: order_id }}).then((order)=> {
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL' }).then(() => {
                req.user.update({ ispremium: true }).then(() => {
                    return res.status(202).json({ success: true, message: "Transaction Successful" });
                }).catch((err) => {
                    throw new Error(err);
                })
            }).catch((err) => {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    }
    catch(err){
        console.log(err);
        throw new Error(err);
    }


}