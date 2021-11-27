const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const chair = await Seat.findOne().skip(rand);
    if(!chair) res.status(404).json({ message: 'Not found...' });
    else res.json(chair);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const chair = await Seat.findById(req.params.id);
    if(!chair) res.status(404).json({ message: 'Not found...' });
    else res.json(chair);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
    const { day , seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    
    await Seat.findOne( {day: day, seat: seat}, async function(err, result){
      if(result){
        res.status(403).json({ message: 'The slot is already taken...' });
      }
      else {
        await newSeat.save();
        res.json({ message: 'OK' });
      }
    } );

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { day , seat, client, email } = req.body;
  try {
    const chair = await Seat.findById(req.params.id);
    const chairIsTaken = await Seat.findOne( {day: day, seat: seat} );
    // const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });

    console.log(chairIsTaken);

    if(chair) {
      if (chairIsTaken){
        res.status(403).json({ message: 'The slot is already taken...' });
      } else {
        await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
        res.json({ message: 'OK' });
      }
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const chair = await Seat.findById(req.params.id);
    if(chair) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};