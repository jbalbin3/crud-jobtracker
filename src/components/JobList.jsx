import React, { useEffect, useState } from 'react';
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
  // console.log('jobs', jobs);

    const [state, setState] = useState({
      columns: [],
      data: [],
    });

    const [selectedRow, setRow] = useState([]);

    console.log('selectedRow state', selectedRow);

    const [open, setOpen] = useState(false);

    console.log('open state', open);

    const handleClose = () => {
        setOpen(false);
        console.log('open?',open);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
     setState({
      columns: [
        { title: 'Job Title', field: 'job_title', validate: rowData => rowData.job_title === '' ? 'Job title cannot be empty' : ''},
        { title: 'Job Description', field: 'job_description', validate: rowData => rowData.job_description === '' ? 'Job description cannot be empty' : ''},
        { title: 'Company', field: 'company', validate: rowData => rowData.company === '' ? 'Company cannot be empty' : ''},
        { title: 'Date applied', field: 'date_applied', type: 'date' , validate: rowData => rowData.date_applied === '' ? 'Date cannot be empty' : ''},
        { title: 'Status', field: 'status', validate: rowData => rowData.status === '' ? 'Status cannot be empty' : ''},
      ],
    // columns: [
    //   { title: 'Job Title', field: 'job_title'},
    //   { title: 'Job Description', field: 'job_description'},
    //   { title: 'Company', field: 'company',},
    //   { title: 'Date applied', field: 'date_applied', type: 'date' },
    //   { title: 'Status', field: 'status' },
    //   ],
      data: jobs})
      }, [jobs]);

  console.log('state',state.columns);

  return (
    <div>
    <MaterialTable
      title="Job Tracker"
      // columns={[
      //   { title: 'Job Title', field: 'job_title', validate: rowData => rowData.job_title === '' ? 'Job title cannot be empty' : ''},
      //   { title: 'Job Description', field: 'job_description', validate: rowData => rowData.job_description === '' ? 'Job description cannot be empty' : ''},
      //   { title: 'Company', field: 'company', validate: rowData => rowData.company === '' ? 'Company cannot be empty' : ''},
      //   { title: 'Date applied', field: 'date_applied', type: 'date' , validate: rowData => rowData.date_applied === '' ? 'Date cannot be empty' : ''},
      //   { title: 'Status', field: 'status', validate: rowData => rowData.status === '' ? 'Status cannot be empty' : ''},
      // ]}
      columns={state.columns}
      data={state.data}
      onRowClick={(event, rowData) => {
          console.log('event', event);
          console.log('rowData', rowData);
          setRow(rowData);
          setOpen(true);
        }
      }
      options={{
        pageSize:10,
        pageSizeOptions: [10, 20, 30],
        headerStyle: {
          backgroundColor: '#447eab',
          color: '#FFF'
        },
      }}
      // actions={[
      //   {
      //     onClick: (event, rowData) => {

      //     }
      //   }
      // ]}
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
            // console.log('new DATA', newData);
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
            // console.log('UPDATE', newData);
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
            // console.log('DELETE', oldData);
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
           {JSON.stringify(selectedRow)}
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