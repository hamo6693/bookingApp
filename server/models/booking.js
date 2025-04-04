const {Sequelize,DataTypes} = require("sequelize")
const db = require("./database")

const Booking = db.define("Booking",{},{
    timestamps:false
})

Booking.sync()

Booking.associte = models => {
    models.User.belongsToMany(models.Event,{through:"Booking"})
    models.Event.belongsToMany(models.User,{through:"Booking"})
}
module.exports = Booking