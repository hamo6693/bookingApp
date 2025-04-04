const models = require("../models");

exports.booking = async (req, res) => {
  try {
    const userBook = await models.Booking.findOne({
      where: {
        //UserId: req.currentUser.id,
        EventId: req.params.eventId,
      }});
      
      const user = await models.User.findAll({
        where:{
          id: req.currentUser.id,
      }})
      console.log({userBook});
      
    if (userBook) {
      await models.Booking.findOne({
        where: {
          UserId: req.currentUser.id,
          EventId: req.params.eventId,
        },});
      res.status(200).json({
        message: "تمت اضافة الحجز مسبقا",
      });
      
    } else {
      await models.Booking.create({
        UserId: req.currentUser.id,
        EventId: req.params.eventId,
      });
      res.status(200).json({
        message: "تمت اضافة الحجز",
      });
    }
    
  } catch (e) {
    res.status(500).json(e.message);
  }
};


exports.deleteBooking = async (req, res) => {
  try {
    const userBook = await models.Booking.findOne({
      where: {
        UserId: req.currentUser.id,
        EventId: req.params.eventId,
      },});
    
      await models.Booking.destroy({
        where: {
          UserId: req.currentUser.id,
          EventId: req.params.eventId,
        },});
      res.status(200).json({
        message: "تمت حذف الحجز",
      });
    
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//جلب حجوزات المسنخدم
exports.getBooking = async (req, res) => {
  try {
    const getBookings = await models.User.findAll({
      where: { id: req.currentUser.id },
      attributes: { exclude: ["password", "confPassword", "email"] },
      include: [{ model: models.Event }],
    });

    res.status(200).json({ getBookings });
  } catch (e) {
    res.status(500).json(e);
  }
};
