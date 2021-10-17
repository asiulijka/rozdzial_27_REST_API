const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


let db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];


app.get('/testimonials', (req, res) => {
  res.send(db);
});

app.get('/testimonials/:id', (req, res) => {

  if (req.params.id == 'random'){
    const randomEl = Math.floor(Math.random() * db.length);

    res.send(db[randomEl]);
  } else {
    const filterId = db.filter(e => e.id == req.params.id)[0]; 
    res.send(filterId ? filterId : '404 not found...');
  };

});

app.post('/testimonials', (req, res) => {
  const {author , text} = req.body;
  db.push({id: uuidv4(), author, text });

  res.send({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  const {author , text} = req.body;
  console.log('PUT!');

  db = db.map(obj => {
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

app.delete('/testimonials/:id', (req, res) => {
  db = db.filter(obj => obj.id != req.params.id);

  res.send({message: 'OK'});
});


app.use((req, res) => {
  res.status(404).send({message: 'Not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});