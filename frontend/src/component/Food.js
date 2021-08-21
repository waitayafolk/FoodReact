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


export default function Food() {
  const classes = useStyles();
  const [showModal , setShowModal] = useState(false)
  const [food , setFood] = useState(false)
  // const [level , setLevel] = useState("admin")
  const [foodlist , setFoodlist] = useState(false)

  useEffect(()=>{
    LoadTpefood()
  },[])

  const LoadTpefood = async()=>{
   let url = hostname + '/food/load_food'
   let rs = await axios.get(url)
   setFoodlist(rs.data)
  }
  const handleClose = () => {
   setShowModal(false);
  };

  const handleChangeReserveData=(e)=>{
    setFood({...food , [e.target.name]: e.target.value})
  }
  
  const Savefood = async() =>{
   let url = hostname + '/food/save_food'
   let rs = await axios.post(url,{
    name_food : food.name_food , 
    name_food_en : food.name_food_en,
    price_food : Number(food.price_food),
    detail_food : food.detail_food
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

  const deleteFood =  (item)=>{
   Swal.fire({
    title: 'จะลบ รายการอาหาร นี้หรือไม่?',
    text: "คุณต้องการลบใช่ไหม!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
     let url = hostname + '/food/delete_food/'+item.id
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
      <h3>รายการอาหาร</h3>
      <Button onClick={() => setShowModal(true)} style={{width : "15%"}} variant="contained" color="primary">
        เพิ่ม รายการอาหาร
      </Button>
    </div>
      <Dialog
          open={showModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
     <DialogTitle id="alert-dialog-title">{"เพิ่ม รายการอาหาร"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name_food"
              label="ชื่อ"
              name="name_food"
              autoFocus
              onChange={handleChangeReserveData}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name_food_en"
              label="ชื่อภาษาอังกฤษ"
              name="name_food_en"
              onChange={handleChangeReserveData}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="price_food"
              label="ราคา"
              type="number"
              id="price_food"
              onChange={handleChangeReserveData}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="detail_food"
              label="รายละเอียดอาหาร"
              name="detail_food"
              onChange={handleChangeReserveData}
            />
             <div>
            </div>
          </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{Savefood()}} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <br />

      <TableContainer component={Paper}>
       <Table className={classes.table} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell align="center">ชื่ออาหาร</TableCell>
             <TableCell align="center">ชื่อภาษาอังกฤษ</TableCell>
             <TableCell align="right">ราคา</TableCell>
             <TableCell align="center">รายละเอียดอาหาร</TableCell>
             <TableCell align="center"></TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
          {(foodlist.length > 0) ? 
              <>
               {foodlist.map((item) => (
             <TableRow>
               <TableCell component="th" align="center" scope="row" style={{minWidth : 150}}>{item.name_food}</TableCell>
               <TableCell align="center" style={{minWidth : 150}}>{item.name_food_en}</TableCell>
               <TableCell align="right" style={{minWidth : 150}}>{item.price_food}</TableCell>
               <TableCell align="center" style={{minWidth : 150}} >{item.detail_food}</TableCell>
               <TableCell align="center">
                <Button
                    onClick={()=>{deleteFood(item)}}
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
