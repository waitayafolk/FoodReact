import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import { hostname } from './Connect';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function User() {
  const classes = useStyles();
  const [showModal , setShowModal] = useState(false)
  const [user , setUser] = useState(false)
  const [level , setLevel] = useState("admin")
  const [userlist , setUserlist] = useState(false)

  useEffect(()=>{
   LoadUser()
  },[])

  const LoadUser = async()=>{
   let url = hostname + '/user/load_user'
   let rs = await axios.get(url)
   setUserlist(rs.data)
  }
  const handleClose = () => {
   setShowModal(false);
  };

  const handleChangeReserveData=(e)=>{
   setUser({...user , [e.target.name]: e.target.value})
  }

  const handleChange = (e) => {
   setLevel(e.target.value);
  };
  const SaveUser = async() =>{
   let url = hostname + '/user/save_user'
   let rs = await axios.post(url,{
    name : user.name , 
    username : user.username,
    password : user.password,
    level : level
   })
   if(rs.data.message == 'Save Success'){
    setShowModal(false);
    LoadUser()
    Swal.fire({
     icon: 'success',
     title: 'Save Success',
     showConfirmButton: false,
     timer: 1500
    })
   }else{
    Swal.fire({
     icon: 'Error',
     title: 'Save Error',
     showConfirmButton: false,
     timer: 1500
    })
   }
  }

  const deleteUser =  (item)=>{
   Swal.fire({
    title: 'จะลบ User นี้หรือไม่?',
    text: "คุณต้องการลบใช่ไหม!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
     let url = hostname + '/user/delete_user/'+item.id
     let rs = await axios.get(url)
     if(rs.data.message == "Success"){
      Swal.fire({
       icon: 'success',
       title: 'Delete Success',
       showConfirmButton: false,
       timer: 1500
      })
      LoadUser()
     }else{
      Swal.fire({
       icon: 'Error',
       title: 'Delete Error',
       showConfirmButton: false,
       timer: 1500
      })
     }
    }
  })
  }

  return (
   <>
    <div className={classes.root}>
      <h3>User / Admin</h3>
      <Button onClick={() => setShowModal(true)} style={{width : "15%"}} variant="contained" color="primary">
        เพิ่ม User
      </Button>
    </div>
    <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
     <DialogTitle id="alert-dialog-title">{"User Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="ชื่อ"
              name="name"
              autoFocus
              onChange={handleChangeReserveData}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              autoFocus
              onChange={handleChangeReserveData}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChangeReserveData}
            />
             <div>
              <FormControl>
                <RadioGroup aria-label="quiz" name="quiz" value={level} onChange={handleChange}>
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  <FormControlLabel value="user" control={<Radio />} label="User" />
                </RadioGroup>
              </FormControl>
            </div>
          </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{SaveUser()}} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <br />

      <TableContainer component={Paper}>
       <Table className={classes.table} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell>ชื่อผู้ใช้งานระบบ</TableCell>
             <TableCell align="right">Username</TableCell>
             <TableCell align="right">Level</TableCell>
             <TableCell align="right"></TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
          {(userlist.length > 0) ? 
              <>
               {userlist.map((item) => (
             <TableRow>
               <TableCell component="th" scope="row">
                 {item.name}
               </TableCell>
               <TableCell align="right">{item.username}</TableCell>
               <TableCell align="right">{item.level}</TableCell>
               <TableCell align="right">
                <Button
                    onClick={()=>{deleteUser(item)}}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
               </TableCell>
             </TableRow>
           ))}
              </>
              :null}
         </TableBody>
       </Table>
     </TableContainer>
   </>
  );
}
