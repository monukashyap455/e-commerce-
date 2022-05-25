const order = require("../model/order");
const transporter = require("../middleware/email");

//add cart
module.exports.addOrder = async (req, res) => {
    const newOrder = new order(req.body);
    try {
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder)

    } catch (error) {
        res.status(500).json(error)
    }

}
//update Order
module.exports.updateOrder = async (req, res) => {
    try {
        const updateOrder = await order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updateOrder)

    } catch (error) {
        console.log(error);

    }
}
//delete Order
module.exports.deleteOrder = async (req, res) => {
    try {
        await order.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json("Order has been deleted")
    } catch (error) {
        res.status(500).json(error)

    }
}
//get user Order
module.exports.getOrder = async (req, res) => {

    try {
        const OrderData = await order.findOne({ userId: req.params.userId });
        res.status(200).json(OrderData)

    } catch (error) {
        res.status(500).json(error)

    }
}
//get all Order
module.exports.getOrders = async (req, res) => {

    try {
        const OrderData = await order.find();
        res.status(200).json(OrderData)

    } catch (error) {
        res.status(500).json(error)

    }
}
//order deliver then status updated
module.exports.orderDeliver = async (req, res) => {

    try {
        const orderd = await order.find()
        // const OTP = Math.floor(1000 + Math.random() * 9000,);
        // const otpExpiresIn = Date.now() + 60 * 1000 * 10;

        // const token = jwt.sign({ userDb_id: userDb._id }, 'secretKey', { expiresIn: "24h" });

        // const obj = {
        //     login_id: userDb._id.toString(),
        //     email: userDb.Email,
        //     otp: OTP,
        //     token,
        //     otpExpiresIn,
        // }
        // const loginUser = await login.findOneAndUpdate({ login_id: userDb._id.toString() })
        // if (!loginUser) {
        //     await login.create(obj)
        // }
        // else {
        //     await login.findOneAndUpdate({ login_id: userDb._id.toString() }, obj)
        // }
        // await loginUser.save()

        // await transporter.sendMail({
        //     from: "monukashyaptest@gmail.com",
        //     to: email,
        //     subject: "Email verifycation for login time",
        //     html: `<p> this email sent to login verification 
        //             <p>${OTP}</p>`
        // })
        // res.status(200).json({ token, message: "otp sent to your mail" })
    } catch (error) {
        res.status(500).json(error)
    }
}
//get monthly income 
module.exports.getIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {

                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }

            }

        ])
        console.log(income)

        res.status(200).json(income)


    } catch (error) {
        res.send(error)

    }

}

