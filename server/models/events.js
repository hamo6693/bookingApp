const {Sequelize,DataTypes} = require("sequelize")
const db = require("./database")

const Event = db.define("Event",{
    title:{
        type:Sequelize.DataTypes.STRING
    },
    description:{
        type:Sequelize.DataTypes.STRING
    },
    price:{
        type:Sequelize.DataTypes.INTEGER
    },
    date:{
        type:Sequelize.DataTypes.DATE
    }
   
    
},{
    timestamps:false
})
Event.sync()
Event.associte = models => {
    Event.belongsTo(models.User)
}
module.exports = Event