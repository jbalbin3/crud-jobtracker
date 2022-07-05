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
      .catch((err)=>{
        console.error('axios error adding job', err);
      })
  }
  function updateJob(job) {
    axios.put(`/api/jobs/${job._id}`, job)
    .catch((err)=>{
      console.error('axios error updating job', err);
    })
  }

  function deleteJob(id) {
    axios.delete(`/api/jobs/${id}`, {params: {id: id}})
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