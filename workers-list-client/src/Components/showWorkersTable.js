
import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import workerSingleTon from '../singleTons/workerSingleTon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Tooltip, InputAdornment, OutlinedInput, DialogTitle, Dialog, DialogActions } from '@mui/material';
import { Add as AddIcon, GetApp as GetAppIcon, ViewColumn as ViewColumnIcon } from '@mui/icons-material';
import ReactToPrint from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import '../Styles/workerTableStyle.css';

const ShowWorkersTable = observer(() => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState(null);
  const handleDelete = () => {
    if (workerToDelete) {
      workerSingleTon.deleteWorker(workerToDelete);
      setOpenDialog(false);
      reloadPage();
    }
  };

  const reloadPage = () => {
    window.location.reload();
  }

  const filteredWorkers = workerSingleTon.workersList.filter(worker =>
    worker &&
    (worker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.workerId.toString().includes(searchTerm))
  );

  const handleClickEdit = (event, worker) => {
    navigate(`/putWorkerForm/${worker.id}`);
  };

  const handleClickAddWorker = () => {
    navigate(`/putWorkerForm/0`);
  };

  const handleClickDelete = (worker) => {
    setWorkerToDelete(worker.id);
    setOpenDialog(true);
  };
  const componentRef = useRef();

  const exportToExcel = (worker) => {
    const csvContent = "data:text/csv;charset=utf-8," +
      [worker.firstName, worker.lastName, worker.workerId, worker.startWorkDate].join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "worker.csv");
    document.body.appendChild(link);
    link.click();
  };

  const exportToExcelAllPage = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      workerSingleTon.workersList
        .filter(worker => worker.isActive !== false)
        .map(worker => [worker.firstName, worker.lastName, worker.workerId, worker.startWorkDate].join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "workers.csv");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <>
      <div>
        <OutlinedInput
          className='outlinedInput'
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <Button
        variant="contained"
        className='addWorkerButton'
        style={{
          '&:hover': {
            backgroundColor: '#c2e7ff',
            boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.25)',
          },
        }}
        onClick={handleClickAddWorker}
      >
        <AddIcon />  Add worker
      </Button>
      <Paper className='Paper scrollable-table' >
        <TableContainer component={Paper} className="tableContainer">
          <Table stickyHeader aria-label="sticky table" >
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell align="center" className="tableHeader" style={{ width: '30%' }}>First Name</TableCell>
                <TableCell align="center" className="tableHeader" style={{ width: '20%' }}>Last Name</TableCell>
                <TableCell align="center" className="tableHeader" style={{ width: '20%' }}>Id Number</TableCell>
                <TableCell align="center" className="tableHeader" style={{ width: '20%' }}>Start Work Date</TableCell>
                <TableCell align="right" className="tableHeader" style={{ width: '20%' }}></TableCell>
                <TableCell style={{ width: '5%', backgroundColor: '#9fc9f4' }} ></TableCell>
                <TableCell className='headerIcons'>
                  <Tooltip title="Export to excel">
                    <IconButton onClick={exportToExcelAllPage}>
                      <GetAppIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell className='headerIcons'>
                  <ReactToPrint
                    trigger={() => (
                      <Tooltip title="Print">
                        <IconButton>
                          <PrintIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    content={() => componentRef.current}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody ref={componentRef}>
              {filteredWorkers.map((worker, index) => (
                <TableRow className='tableRow'
                  key={index}
                >
                  <TableCell align="center" className="tableCell" style={{ width: '20%' }}>{worker.firstName}</TableCell>
                  <TableCell align="center" className="tableCell" style={{ width: '20%' }}>{worker.lastName}</TableCell>
                  <TableCell align="center" className="tableCell" style={{ width: '20%' }}>{worker.workerId}</TableCell>
                  <TableCell align="center" className="tableCell" style={{ width: '20%' }}>{worker.startWorkDate}</TableCell>
                  <TableCell className="tableCell">
                    <Tooltip title="Edit employee" onClick={(event) => handleClickEdit(event, worker)}>
                      <IconButton className="iconButton">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete employee" onClick={(event) => handleClickDelete(worker)}>
                      <IconButton className="iconButton">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Export to Excel" onClick={() => exportToExcel(worker)}>
                      <IconButton className="iconButton">
                        <SaveAltIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this employee?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDelete()} color="primary" >Confirm Delete</Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
})

export default ShowWorkersTable;
