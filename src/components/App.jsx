import React, { useState, useEffect } from 'react';

import JobList from './JobList.jsx';
import axios from 'axios';


const App = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs')
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.error('axios error getting jobs', err));
  }, []);

  function addJob(job) {
    axios.post('/api/jobs', job)
      .then((res) => {
        setJobs(prevState => {
          const jobData = [...prevState, res.data];
          return jobData;
        });
      })
      .catch((err)=>{
        console.error('axios error adding job', err);
      })
  }
  function updateJob(job, oldJob) {
    axios.put(`/api/jobs/${job._id}`, job)
    .then(() => {
      setJobs(prevState => {
        const jobData = [...prevState];
        jobData[jobData.indexOf(oldJob)] = job;
        return jobData;
      });
    })
    .catch((err)=>{
      console.error('axios error updating job', err);
    })
  }

  function deleteJob(job) {
    axios.delete(`/api/jobs/${job._id}`, {params: {id: job._id}})
      .then((res) => {
        setJobs(prevState => {
          const jobData = [...prevState];
          jobData.splice(jobData.indexOf(job), 1);
          return jobData;
        });
      })
      .catch((err)=>{
        console.error('axios error deleting job', err);
      })
  }

  return (
      <div>
        <JobList jobs={ jobs } updateJob={ updateJob } deleteJob={ deleteJob } addJob={ addJob } />
      </div>
  );
}

export default App;