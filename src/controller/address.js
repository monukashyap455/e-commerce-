const address = require("../model/address");



module.exports.addAddress = async (req, res) => {

    try {
        const newAddress = new address(req.body);
        const saveAddress = await newAddress.save();
        res.status(200).json(saveAddress)

    } catch (error) {
        res.status(500).json(error)

    }

}

module.exports.getAddress = async (req, res) => {

    try {
        const AddressData = await address.findById({ _id: req.params.id });
        res.status(200).json(AddressData)

    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports.updateAddress = async (req, res) => {
    try {
        const updateAddress = await address.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updateAddress)

    } catch (error) {
        console.log(error);

    }
}

module.exports.deleteAddress = async (req, res) => {
    try {
        await address.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json("Address has been deleted")
    } catch (error) {
        res.status(500).json(error)

    }
}

