const express = require('express');
const cors = require('cors');
// const router = express.Router();

let db = require('./db');

const app = express();

const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes); 
app.use('/api', testimonialsRoutes); 



app.use((req, res) => {
  res.status(404).send({message: 'Not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});