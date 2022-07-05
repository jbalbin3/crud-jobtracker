const express = require('express');
var mongodb = require('mongodb');
const Job = require('../database');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.static('public'));
app.use(express.json());

app.listen((PORT), ()=> { console.log('listening on port', PORT)});

// CREATE
app.post('/api/jobs', (req, res) => {
  var job1 = new Job(req.body);
  job1.save((err, job)=>{
    if (err) {
      res.sendStatus(404);
      return console.error('db error saving job', err);
    }
    res.status(200).send(job);
  })
});

// READ
app.get('/api/jobs', (req, res) => {
  Job.find({}).sort('-date_applied')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.sendStatus(404);
      console.log('error reading from database ', err);
    });
});

// UPDATE
app.put('/api/jobs/:id', (req, res) => {
  Job.findOneAndUpdate({_id: new mongodb.ObjectId(req.params.id)}, req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.sendStatus(404);
      console.log('error updating data from database ', err);
    });
});

// DELETE
app.delete('/api/jobs/:id', (req, res) => {
  Job.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.sendStatus(404);
      console.log('error deleting data from database ', err);
    });
});

// DELETE MANY
app.post('/api/deletejobs', (req, res) => {
  Job.deleteMany({_id: {$in: req.body}})
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    res.sendStatus(404);
    console.log('error deleting data from database ', err);
  });
});