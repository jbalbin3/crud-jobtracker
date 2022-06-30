import React, { useState, useEffect } from 'react';

import JobList from './JobList.jsx';
import axios from 'axios';


const App = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs')
      .then((res) => {
        // console.log('DATA',res.data);
        setJobs(res.data);
      })
      .catch((err) => console.log('error ', err));
  }, []);

  function addJob(job) {
    // console.log('JOB TO ADD', job);
    axios.post('/api/jobs', job)
      .then((res)=>{
        console.log('response from server', res.data);
      })
      .catch((err)=>{
        console.error('axios error posting job', err);
      })
  }
  function updateJob(job) {
    // console.log('UPDATE',job);
    axios.put(`/api/jobs/${job._id}`, job)
    .then((res)=>{
      console.log('response from server', res.data);
    })
    .catch((err)=>{
      console.error('axios error posting job', err);
    })
  }

  function deleteJob(id) {
    // console.log('ID to delete',id)
    axios.delete(`/api/jobs/${id}`, {params: {id: id}})
      .then((res)=>{
        console.log('response from server', res.data);
      })
      .catch((err)=>{
        console.error('axios error posting job', err);
      })
  }

  return (
      <div>
        <JobList jobs={ jobs } updateJob={ updateJob } deleteJob={ deleteJob } addJob={ addJob }/>
      </div>
  );
}

export default App;