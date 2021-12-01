const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes); 
app.use('/api', testimonialsRoutes); 

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use((req, res) => {
  res.status(404).send({message: 'Not found...'});
})

// dodane 27.11
// connects our backend code with the database
// mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://asiulijka:<WPISZ HASLO>@cluster0.uaxzb.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

// 1.12 albo:
// const NODE_ENV = process.env.NODE_ENV;
// let dbUri = '';

// if(NODE_ENV === 'production') dbUri = 'url to remote db';
// else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
// else dbUri = 'mongodb+srv://asiulijka:<WPISZ HASLO>@cluster0.uaxzb.mongodb.net/NewWaveDB?retryWrites=true&w=majority';

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;




// wzorowane z:

// const NODE_ENV = process.env.NODE_ENV;
// let dbUri = '';

// if(NODE_ENV === 'production') dbUri = 'url to remote db';
// else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/companyDBtest';
// else dbUri = 'mongodb://localhost:27017/companyDB';

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;




db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));