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


export default function Groupproduct() {
  const classes = useStyles();
  const [showModal , setShowModal] = useState(false)
  const [typefood , setTypefood] = useState(false)
  const [typefoodlist , setTypefoodlist] = useState(false)

  useEffect(()=>{
    LoadTpefood()
  },[])

  const LoadTpefood = async()=>{
   let url = hostname + '/type_food/load_type_food'
   let rs = await axios.get(url)
   setTypefoodlist(rs.data)
  }
  const handleClose = () => {
   setShowModal(false);
  };

  const handleChangeReserveData=(e)=>{
    setTypefood({...typefood , [e.target.name]: e.target.value})
  }


  const SaveTypefood = async() =>{
    // console.log(typefood)
   let url = hostname + '/type_food/save_type_food'
   let rs = await axios.post(url,{
    group_food_code : typefood.group_food_code , 
    name_group_food : typefood.name_group_food,
    name_group_food_en : typefood.name_group_food_en
   })
   if(rs.data.message == 'Save Success'){
    setShowModal(false);
    LoadTpefood()
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

  const deleteTypeFood =  (item)=>{
   Swal.fire({
    title: 'จะลบ ประเภทอาหาร นี้หรือไม่?',
    text: "คุณต้องการลบใช่ไหม!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
     let url = hostname + '/type_food/delete_type_food/'+item.id
     let rs = await axios.get(url)
     if(rs.data.message == "Success"){
      Swal.fire({
       icon: 'success',
       title: 'Delete Success',
       showConfirmButton: false,
       timer: 1500
      })
      LoadTpefood()
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
      <h3>ประเภทอาหาร</h3>
      <Button onClick={() => setShowModal(true)} style={{width : "15%"}} variant="contained" color="primary">
        เพิ่ม ประเภทอาหาร
      </Button>
    </div>
    <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
     <DialogTitle id="alert-dialog-title">{"เพิ่ม ประเภทอาหาร"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name_group_food"
              label="ชื่อ"
              name="name_group_food"
              autoFocus
              onChange={handleChangeReserveData}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name_group_food_en"
              label="ชื่อภาษาอังกฤษ"
              name="name_group_food_en"
              onChange={handleChangeReserveData}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="group_food_code"
              label="รหัสประเภทอาหาร"
              type="text"
              id="group_food_code"
              onChange={handleChangeReserveData}
            />
             <div>
            </div>
          </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{SaveTypefood()}} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <br />

      <TableContainer component={Paper}>
       <Table className={classes.table} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell align="center">รหัสประเภทอาหาร</TableCell>
             <TableCell align="center">ชื่อ</TableCell>
             <TableCell align="center">ชื่อภาษาอังกฤษ</TableCell>
             <TableCell align="center"></TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
          {(typefoodlist.length > 0) ? 
              <>
               {typefoodlist.map((item) => (
             <TableRow>
               <TableCell align="center" component="th" scope="row">{item.group_food_code}</TableCell>
               <TableCell align="center">{item.name_group_food}</TableCell>
               <TableCell align="center">{item.name_group_food_en}</TableCell>
               <TableCell align="center">
                <Button
                    onClick={()=>{deleteTypeFood(item)}}
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
