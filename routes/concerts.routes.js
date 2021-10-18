const express = require('express');
let db = require('../db');

const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.route('/concerts').get((req, res) => {
  res.send(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  if (req.params.id == 'random'){
    const randomEl = Math.floor(Math.random() * db.concerts.length);
    res.send(db.concerts[randomEl]);
  } else {
    const filterId = db.concerts.filter(e => e.id == req.params.id)[0]; 
    res.send(filterId ? filterId : {message: 'Not found...'});
  };
});

router.route('/concerts').post((req, res) => {
  const {performer , genre, price, day, image} = req.body;
  db.concerts.push({id: uuidv4(), performer, genre, price, day, image });

  res.send({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
  const {performer , genre, price, day, image} = req.body;

  db.concerts = db.concerts.map(obj => {
    if (obj.id == req.params.id){
      return {
        id: obj.id,
        performer: performer,
        genre: genre,
        price: price, 
        day: day, 
        day: image,
      };
    } else {
      return obj;
    };
  });

  res.send({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts = db.concerts.filter(obj => obj.id != req.params.id);

  res.send({message: 'OK'});
});

module.exports = router;