const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Test Performer#1', genre: 'TestGenre#1', price: 25, day: 3, image: 'TestImage#1'  });
    await testConcertOne.save();
  
    const testConcertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Test Performer#2', genre: 'TestGenre#2', price: 55, day: 2, image: 'TestImage#2' });
    await testConcertTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/random should return one random concert', async () => {
    const res = await request(server).get('/api/concerts/random');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/:performer should return concerts by :performer ', async () => {
    const res = await request(server).get('/api/concerts/performer/Test Performer#1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('/:genre should return concerts by :genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/TestGenre#2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('/price should return concerts by price search ', async () => {
    const res = await request(server).get('/api/concerts/price/20/40');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/:day should return concerts by :day ', async () => {
    const res = await request(server).get('/api/concerts/day/2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });
});