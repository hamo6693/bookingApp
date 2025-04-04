const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const eventController = require("../controller/eventController")
const isLoggedIn = require("../middlewares/authentication")
const {userValidationRules,validate,updateUserValidationRules,eventValidationRules} = require("../middlewares/validtor")
const  bookingController  = require("../controller/bookingController")
const  getBookingController  = require("../controller/bookingController")
const upload = require("../middlewares/upload")


router.get("/",(req,res) => {
    res.json({
        message:"hello word"
    })
})

router.post("/register",userValidationRules(),validate,userController.register)

router.post("/login",updateUserValidationRules(),validate,userController.login)

router.post("/event/create",isLoggedIn,eventValidationRules(),validate,eventController.createEvent)

router.get("/event",eventController.getEvent)



router.put("/event/:eventId",isLoggedIn,bookingController.booking)



router.delete("/event/:eventId",isLoggedIn,bookingController.deleteBooking)



router.get("/mybooking",isLoggedIn,bookingController.getBooking)




router.get("/profile",isLoggedIn,userController.getName)

router.put("/profile",isLoggedIn,userController.updateProfile)

router.put("/profile/upload-photo",upload.single("avatar"),isLoggedIn,userController.uploadUserPhoto);


module.exports = router