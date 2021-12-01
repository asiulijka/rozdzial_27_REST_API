const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getById);
router.post('/concerts', ConcertController.postNew);
router.put('/concerts/:id', ConcertController.putById);
router.delete('/concerts/:id', ConcertController.deleteById);

// 1.12

router.get('/concerts/performer/:performer', ConcertController.getPerformer); // do wyszukiwania koncertów danego artysty,
router.get('/concerts/genre/:genre', ConcertController.getGenre); // do wyszukiwania koncertów z wybranego gatunku muzycznego,
router.get('/concerts/price/:price_min/:price_max', ConcertController.getPrice);  // do wyszukiwania koncertów o cenie z przedziału :price_min - :price_max,
router.get('/concerts/day/:day', ConcertController.getConcertByDay);  // do wyszukiwania koncertów w wybranym dniu.

module.exports = router;