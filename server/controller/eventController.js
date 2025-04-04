const models = require("../models");

exports.createEvent = async (req, res) => {
  const { title, description, price,date } = req.body;
  try {
    const event = await models.Event.create({
      title,
      description,
      price,
      //created_at,
      date,

      UserId: req.currentUser.id,
    });

    res.status(200).json({ message: event });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.getEvent = async (req, res) => {
  try {
    const getEvent = await models.Event.findAll({
      EventId: req.params.eventId,

    });
    

    res.status(200).json({ getEvent });
  } catch (e) {
    res.status(500).json(e.message);
  }
};
