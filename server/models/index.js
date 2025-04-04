const {Sequelize} = require("sequelize")
const db = require("./database")
const User = require("./user")
const Event = require("./events")
const Booking = require("./booking")

const models = {
    User:User,
    Event:Event,
    Booking:Booking
}

Object.keys(models).forEach(key => {
    if("associte" in models[key]){
        models[key].associte(models)
    }
})
module.exports = models