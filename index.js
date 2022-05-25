const exp = require("constants");
const express = require("express")
const dotenv = require("dotenv");
dotenv.config();
const mongoDb =require("./src/server/mongodb");

const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const static_path = path.join(__dirname, 'src/public');
app.use(express.static(static_path));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "src/views"));
const mainRoute =require('./src/routes/masterRoute');

mongoDb()
app.use(mainRoute);



const port = process.env.PORT 
app.listen(port, () => console.log(`server is running on port ${port}`))


