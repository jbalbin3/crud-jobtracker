import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({

  job_title: String,
  job_description: String,
  company: String,
  date_applied: Date,
  status: String

});

export default jobSchema;