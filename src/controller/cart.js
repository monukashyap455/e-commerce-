const cart = require("../model/cart");

//add cart
module.exports.addCart = async (req, res) => {
    const newCart = new cart(req.body);
    try {
        const saveCart = await newCart.save();
        res.status(200).json(saveCart)

    } catch (error) {
        res.status(500).json(error)

    }

}
//update cart
module.exports.updateCart = async (req, res) => {
    try {
        const updateCart = await cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updateCart)

    } catch (error) {
        console.log(error);

    }
}
//delete cart
module.exports.deleteCart = async (req, res) => {
    try {
        await cart.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json("cart has been deleted")
    } catch (error) {
        res.status(500).json(error)

    }
}
//get user cart
module.exports.getCart = async (req, res) => {

    try {
        // console.log(req.params.userId);
        const cartData = await cart.findOne({ userId: req.params.userId });
        // console.log(cartData);
        res.status(200).json(cartData)

    } catch (error) {
        res.status(500).json(error)

    }
}
//get all cart
module.exports.getCarts = async (req, res) => {

    try {
        const cartData = await cart.find();
        res.status(200).json(cartData)

    } catch (error) {
        res.status(500).json(error)

    }

}

