
const {Sequelize} = require("sequelize")
require("dotenv").config()

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER, 
  process.env.DB_PASS,{
  host:process.env.DB_HOST,
    dialect:"postgres",
    logging:false
  })


  try {
     db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  module.exports = db