const mongoose = require('mongoose');
const jobSchema = require('./schema.js');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/job-tracker';
mongoose.Promise = global.Promise;

const db = mongoose.createConnection(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Job = db.model('Job', jobSchema);

module.exports = Job;