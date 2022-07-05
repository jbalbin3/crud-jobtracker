import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const JobList = ({ jobs, addJob, updateJob, deleteJob }) => {

    const [state, setState] = useState({
      columns: [],
      data: [],
    });

    const [selectedRow, setRow] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleBulkDelete = () => {
      // create an list of ids to delete
      const ids = selectedRows.map((job) => { return job._id; });

      axios.post(`/api/deletejobs/`, ids)
      .then(()=>{
        setState(prevState => {
          const updatedData = prevState.data.filter(row => !selectedRows.includes(row));
          return { columns: prevState.columns, data: updatedData };
        });
      })
      .catch((err)=>{
        console.error('axios error deleting jobs', err);
      })
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const renderJobForModal = (job) => {
        return (
          <div>
            <h3>Job Title</h3>
            {job.job_title}
            <h3>Job Description</h3>
            {job.job_description}
            <h3>Company</h3>
            {job.company}
            <h3>Date Applied</h3>
            job.date_applied
            <h3>Status</h3>
            {job.status}
          </div>
        )
    }

    useEffect(() => {
     setState({
      columns: [
        { title: 'Job Title', field: 'job_title', validate: rowData => rowData.job_title === '' || rowData.job_title === undefined ? 'required' : true },
        { title: 'Job Description', field: 'job_description', validate: rowData => rowData.job_description === '' || rowData.job_description === undefined ? 'required' : true },
        { title: 'Company', field: 'company', validate: rowData => rowData.company === '' || rowData.company === undefined ? 'required' : true },
        { title: 'Date applied', field: 'date_applied', type: 'date' , validate: rowData => rowData.date_applied === '' || rowData.date_applied === undefined ? 'Date required' : true},
        { title: 'Status', field: 'status', lookup: { notApplied: 'not applied', applied: 'applied', interviewed: 'interviewed', offerExtended: 'offer extended'}, validate: rowData => rowData.status === '' || rowData.status === undefined ? 'Status required' : true },
      ],
      data: jobs})
      }, [jobs]);

  return (
    <div>
    <MaterialTable
      title="Job Tracker"

      columns={state.columns}
      data={state.data}
      onRowClick={(event, rowData) => {
          setRow(rowData);
          setOpen(true);
        }
      }
      onSelectionChange = {(rows) => setSelectedRows(rows)}
      options={{
        pageSize:10,
        pageSizeOptions: [10, 20, 30],
        headerStyle: {
          backgroundColor: '#447eab',
          color: '#FFF'
        },
        actionsColumnIndex: -1,
        selection: true
      }}
      actions={[
        {
          icon: 'delete',
          tooltip: "Delete selected rows",
          onClick: () => handleBulkDelete()
        }
      ]}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
            addJob(newData);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
            updateJob(newData)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
            deleteJob(oldData._id);
          }),
      }}
    />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Job Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           {renderJobForModal(selectedRow)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobList;