
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, Grid } from '@mui/material';
import workerSingleton from '../singleTons/workerSingleTon';
import { useNavigate, useParams } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import positionSingleTon from '../singleTons/positionSingleTon';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { observer } from 'mobx-react-lite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TransgenderIcon from '@mui/icons-material/Transgender';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import '../Styles/workerTableStyle.css';

const PutWorkerForm = observer(() => {

  const { register, handleSubmit, setValue, control } = useForm();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { workerId } = useParams();
  const [worker, setWorker] = useState(null);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    if (workerId === "0" && worker === null) {
      setIsAdd(true);
    } else {
      const workerToApdate = workerSingleton.workersList.find(worker => worker.id === parseInt(workerId));
      setWorker(workerToApdate);
      setIsEdit(true);
    }
  }, [workerId, worker]);

  useEffect(() => {
    setValue('firstName', worker?.firstName || " ");
    setValue('lastName', worker?.lastName || " ",);
    setValue('password', worker?.password || " ");
    setValue('workerId', worker?.workerId || " ");
    setValue('startWorkDate', worker?.startWorkDate || " ");
    setValue('birthDate', worker?.birthDate || " ");
    setValue('gender', worker?.gender || " ");
    setValue('positions', worker?.positions || '')
  }, [worker, setValue]);

  const [updateTable, setUpdateTable] = useState(false);//משתנה לרינדור אוטומטי לאחר שינוי
  
  useEffect(() => {
    workerSingleton.getWorkersList();
  }, [updateTable])

  const { fields, append, remove } = useFieldArray({
    control,
    name: "positions"
  });
  return (
    <>
      <form onSubmit={handleSubmit((data) => {

        if (isEdit === true) {
          workerSingleton.putWorker(workerId, data)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The worker has been updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
        else {
          workerSingleton.postWorker(data)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The worker has been saved successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
        if (updateTable === true) {
          setUpdateTable(false)
        }
        else {
          setUpdateTable(true);
        }
        navigate(`/`);
      })}>

        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={() => navigate('/')} className='arrowIcon'>
            <ArrowBackIcon />
          </IconButton>
          <Grid container justifyContent="center" >
            <Grid item xs={200} md={200} sx={{ marginLeft: '11%', marginTop: '3vh' }}>
              <Grid container spacing={2} >
                <Grid item xs={12}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    className='inputForm'
                    {...register("firstName", { required: true })}
                    InputProps={{
                      endAdornment: <PersonAddIcon />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    className='inputForm'
                    {...register("lastName", { required: true })}
                    InputProps={{
                      endAdornment: <PersonAddAlt1Icon />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="password"
                    name="password"
                    className='inputForm'
                    {...register("password", { required: true })}
                    InputProps={{
                      endAdornment: <NoEncryptionIcon />,
                    }}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Worker ID"
                    name="workerId"
                    className='inputForm'
                    {...register("workerId", { required: true })}
                    InputProps={{
                      endAdornment: <FingerprintIcon />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type='datetime-local'
                    label='startWorkDate'
                    className='inputForm'
                    {...register("startWorkDate", { required: true })}
                    InputProps={{
                      endAdornment: <CalendarMonthIcon />,
                    }}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type='datetime-local'
                    label='birthDate'
                    className='inputForm'
                    {...register("birthDate", { required: true })}
                    InputProps={{
                      endAdornment: <PermContactCalendarIcon />,
                    }}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Gender"
                    name="gender"
                    className='inputForm'
                    {...register("gender", { required: true })}
                    InputProps={{
                      endAdornment: <TransgenderIcon />,
                    }}
                  />
                </Grid>
                <Grid container >
                  <Grid item>
                    <Button onClick={toggleDrawer('right', true)} endIcon={<WorkOutlineIcon />} sx={{
                      marginLeft: '70%',
                      border: '2px solid #5787b8',
                      borderRadius: '10px',
                      width: '11vw',
                      marginTop: '5%',
                    }}>Set Positions</Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {isEdit &&
                    <Button variant="contained" color="primary" type="submit" sx={{ marginLeft: '7.7%', borderRadius: '10px' }}>Update Worker</Button>}
                  {isAdd &&
                    <Button variant="contained" color="primary" type="submit" sx={{ marginLeft: '8.6%' }}>Add Worker</Button>}
                </Grid>
              </Grid>
              <Drawer
                anchor="right"
                open={state['right']}
                onClose={toggleDrawer('right', false)}>
                <Button variant='contained' startIcon={<AddIcon />} color='primary' type='button' onClick={() =>
                  append({ positionName: '', isAdministrative: false, startPositionDate: '' })} className='addPositionButton'>Add Position</Button>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" className='headerPosition' >Position Name</TableCell>
                        <TableCell align="center" className='headerPosition'>Is Administrative</TableCell>
                        <TableCell align="center" className='headerPosition'>Start Position Date</TableCell>
                        <TableCell align="center" className='headerPosition'></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fields.map((position, index) => (
                        <TableRow key={index}>
                          <TableCell >
                            <Select sx={{ width: '13vw' }}
                              className='textField'
                              label="Position"
                              defaultValue={position.positionName}
                              {...register(`positions[${index}].positionName`, { required: true })}
                            >
                              {positionSingleTon.positionNames.map((positionName) => (
                                (!worker || !worker.positions.some((p) => p.positionName === positionName) || position.positionName === positionName) && (
                                  <MenuItem key={positionName} value={positionName}>
                                    {positionName}
                                  </MenuItem>)
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select sx={{ width: '13vw' }}
                              defaultValue={position.isAdministrative}
                              {...register(`positions[${index}].isAdministrative`, { required: true })}
                            >
                              <MenuItem value={true}>true</MenuItem>
                              <MenuItem value={false}>false</MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <TextField
                              name={`positions[${index}].startPositionDate`}
                              type='datetime-local'
                              defaultValue={position.startPositionDate}
                              InputProps={{
                                inputProps: {
                                  min: worker ? worker.startWorkDate : ''
                                }
                              }}
                              {...register(`positions[${index}].startPositionDate`, { required: true })}
                            />
                          </TableCell>
                          <TableCell sx={{ marginTop: '1.5%' }}>
                            <Tooltip title="Delete Position">
                              <IconButton aria-label="delete" onClick={() => remove(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button variant="contained" className='closeDrawerButton' onClick={toggleDrawer('right', false)}>Close</Button>
              </Drawer>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
})
export default PutWorkerForm;




