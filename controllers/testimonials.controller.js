const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const quote = await Testimonial.findOne().skip(rand);
    if(!quote) res.status(404).json({ message: 'Not found...' });
    else res.json(quote);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const quote = await Testimonial.findById(req.params.id);
    if(!quote) res.status(404).json({ message: 'Not found...' });
    else res.json(quote);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
      const { author , text } = req.body;
      const newTestimonial = new Testimonial({ author: sanitize(author) , text: sanitize(text) });
      await newTestimonial.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
  const { author , text} = req.body;
  try {
    const quote = await Testimonial.findById(req.params.id);
    if(quote) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author , text: text }});
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
    const quote = await Testimonial.findById(req.params.id);
    if(quote) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};