const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const show = await Concert.findOne().skip(rand);
    if(!show) res.status(404).json({ message: 'Not found...' });
    else res.json(show);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const show = await Concert.findById(req.params.id);
    if(!show) res.status(404).json({ message: 'Not found...' });
    else res.json(show);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
  const { performer , genre, price, day, image } = req.body;
  try {
    const show = await Concert.findById(req.params.id);
    if(show) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const show = await Concert.findById(req.params.id);
    if(show) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// router.get('/concerts/performer/:performer', ConcertController.getPerformer); 
// do wyszukiwania koncertów danego artysty,

exports.getPerformer = async (req, res) => {
  try {
    const performer = await Concert.find({ performer: req.params.performer });
    if(!performer) res.status(404).json({ message: 'Not found...' });
    else res.json(performer);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// router.get('/concerts/genre/:genre', ConcertController.getGenre); 
// do wyszukiwania koncertów z wybranego gatunku muzycznego,
exports.getGenre = async (req, res) => {
  try {
    const genre = await Concert.find({ genre: req.params.genre });
    if(!genre) res.status(404).json({ message: 'Not found...' });
    else res.json(genre);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// router.get('/concerts/price/:price_min/:price_max', ConcertController.getPrice);  
// do wyszukiwania koncertów o cenie z przedziału :price_min - :price_max,
exports.getPrice = async (req, res) => {
  try {
    const concerts = await Concert.find(
      { $and: [
        { price: { $gte: req.params.price_min } }, 
        { price: {  $lte: req.params.price_max }}
      ]});

    if(!concerts) res.status(404).json({ message: 'Not found...' });
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// router.get('/concerts/day/:day', ConcertController.getConcertByDay);  
// do wyszukiwania koncertów w wybranym dniu.
exports.getConcertByDay = async (req, res) => {
  try {
    const day = await Concert.find({ day: req.params.day });
    if(!day) res.status(404).json({ message: 'Not found...' });
    else res.json(day);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};