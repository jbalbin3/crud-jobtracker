require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.static('public'));
app.use(express.json());

var mongodb = require('mongodb');
const Job = require('../database');

app.listen((PORT), ()=> { console.log('listening on port', PORT)});

// CREATE
app.post('/api/jobs', (req, res) => {

  console.log('CREATE' , req.body);

  var job1 = new Job(req.body);
  job1.save((err, job)=>{
    if (err) return console.error('db error saving job', err);
    console.log('saved job for ',job.company);
    res.status(200).send(job);
  })
});

// READ
app.get('/api/jobs', (req, res) => {

  console.log('read');
  Job.find(req.params).sort('-date_applied')
    .then((data) => {
      console.log('type', typeof(data));
      console.log('DATA SENT', data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error getting data from database ', err);
    });
});

// UPDATE
app.put('/api/jobs/:id', (req, res) => {

  // console.log('update one', req.body)
  Job.findOneAndUpdate({_id: new mongodb.ObjectId(req.body._id)}, req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error getting data from database ', err);
    });
});

// DELETE
app.delete('/api/jobs/:id', (req, res) => {
  // console.log('delete one', req.params.id)
  Job.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error getting data from database ', err);
    });
});

