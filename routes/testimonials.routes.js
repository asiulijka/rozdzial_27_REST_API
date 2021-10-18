const express = require('express');
const db = require('../db');

const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.route('/testimonials').get((req, res) => {
  res.send(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  if (req.params.id == 'random'){
    const randomEl = Math.floor(Math.random() * db.testimonials.length);
    res.send(db.testimonials[randomEl]);
  } else {
    const filterId = db.testimonials.filter(e => e.id == req.params.id)[0]; 
    res.send(filterId ? filterId : {message: 'Not found...'});
  };
});

router.route('/testimonials').post((req, res) => {
  const {author , text} = req.body;
  db.testimonials.push({id: uuidv4(), author, text });

  res.send({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
  const {author , text} = req.body;

  db.testimonials = db.testimonials.map(obj => {
    if (obj.id == req.params.id){
      return {
        id: obj.id,
        author: author,
        text: text,
      };
    } else {
      return obj;
    };
  });

  res.send({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials = db.testimonials.filter(obj => obj.id != req.params.id);

  res.send({message: 'OK'});
});

module.exports = router;