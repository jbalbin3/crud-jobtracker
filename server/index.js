import express from 'express';
import mongodb from 'mongodb';
import Job from '../database/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.static('public'));
app.use(express.json());

app.listen((PORT), ()=> { console.log('listening on port', PORT)});

// CREATE
app.post('/api/jobs', async (req, res) => {
  try {
    var job1 = new Job(req.body);
    const job = await job1.save()
    res.status(200).send(job);
  } catch (error) {
    res.sendStatus(404);
    console.error('db error saving job', error);
  }
});

// READ
app.get('/api/jobs', async (req, res) => {
  try {
    const data = await Job.find({}).sort('-date_applied');
    res.status(200).send(data);
  } catch(error) {
    res.sendStatus(404);
    console.error('error reading from database ', error);
  }
});

// UPDATE
app.put('/api/jobs/:id', async (req, res) => {
  try {
    const data = await Job.findOneAndUpdate({_id: new mongodb.ObjectId(req.params.id)}, req.body);
    res.status(200).send(data);
  } catch(error) {
    res.sendStatus(404);
    console.error('error updating data from database ', error);
  }
});

// DELETE
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const data = await Job.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send(data);
  } catch(error) {
    res.sendStatus(404);
    console.error('error deleting data from database ', error);
  }
});

// DELETE MANY
app.post('/api/deletejobs', async (req, res) => {
  try {
    const data = await Job.deleteMany({_id: {$in: req.body}});
    res.status(200).send(data);
  } catch(error) {
    res.sendStatus(404);
    console.error('error deleting data from database ', error);
  }
});