const product = require("../model/product");



module.exports.productAdd = async (req, res) => {
    console.log(req.file.filename);
    req.body.image =req.file.filename
    const newProduct = new product(req.body);
    try {
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct)

    } catch (error) {
        res.status(500).json(error)

    }

}

module.exports.updateProduct = async (req, res) => {
    try {
        const updateProduct = await product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updateProduct)

    } catch (error) {
        console.log(error);

    }
}

module.exports.deleteProducts = async (req, res) => {
    try {
        await product.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json("product has been deleted")
    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports.getProduct = async (req, res) => {

    try {
        const productData = await product.findById();
        res.status(200).json(productData)

    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports.getAllProducts = async (req, res) => {
    const qNew = req.query.new 
    const limit = req.query.limit 
    const qCategory = req.query.categories
    console.log(qCategory);
    try {
        let products;
        if (qNew) {
            products = await (await product.find().sort({ createdAt: -1 })).limit(1)
        }else if (limit) {
            products = await product.find().limit(limit)
        } 
        else if (qCategory) {
            products = await product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await product.find();

        }
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json(error)
    }
}
