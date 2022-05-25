const mongoose = require("mongoose");
const user = require("../model/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {

    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");

        const userData = user({
            firstname: "Monu ",
            lastname: "Kashyap",
            email: "monu@yopmail.com",
            birth: "01/01/2000",
            mobile: "1234567892",
            gender: "male",
            password: await bcrypt.hash("Monu@123", 10),
            isAdmin: true
        })
        const adminFind = await user.findOne({ email: "monu@yopmail.com" })
        if (!adminFind) {
            await userData.save()
        }

    } catch (error) {
        console.log(error);
    }
}








