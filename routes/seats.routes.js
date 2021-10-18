const express = require('express');
const db = require('../db');

const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.route('/seats').get((req, res) => {
  res.send(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  if (req.params.id == 'random'){
    const randomEl = Math.floor(Math.random() * db.seats.length);
    res.send(db.seats[randomEl]);
  } else {
    const filterId = db.seats.filter(e => e.id == req.params.id)[0]; 
    res.send(filterId ? filterId : {message: 'Not found...'});
  };
});

router.route('/seats').post((req, res) => {
  const {day , seat, client, email} = req.body;
  db.seats.push({id: uuidv4(), day, seat, client, email });

  res.send({message: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
  const {day , seat, client, email} = req.body;

  db.seats = db.seats.map(obj => {
    if (obj.id == req.params.id){
      return {
        id: obj.id,
        day: day,
        seat: seat,
        client: client, 
        email: email,
      };
    } else {
      return obj;
    };
  });

  res.send({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
  db.seats = db.seats.filter(obj => obj.id != req.params.id);

  res.send({message: 'OK'});
});

module.exports = router;