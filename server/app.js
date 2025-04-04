//للحصول على الخادم
const express = require("express")
const router = require("./routes")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const db = require("./models/database")
const models = require("./models")
require("dotenv").config()

const port = process.env.PORT


const app = express()


//ترويسة الطلب
app.use(cors())
//حالة الطلب
app.use(morgan("dev"))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("*/images",express.static(__dirname + "/public/images"))


app.use("/",router)


//التعامل مع طلبات جسم الصفحة والواجهة الامامية
db.sync().then(() => {
    app.listen(port,() =>{
        console.log("server is start " + port);
    })
})
