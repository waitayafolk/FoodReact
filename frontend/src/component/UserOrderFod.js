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
import DetailsIcon from '@material-ui/icons/Details';
import DetailOrder from './modal/detail';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function UserOrderFod() {
  const classes = useStyles();
  const [showModal , setShowModal] = useState(false)
  const [user , setUser] = useState(false)
  const [level , setLevel] = useState("admin")
  const [orderlist , setOrderlist] = useState(false)
  const [detailorder , setdetail] = useState(false)
  const [modaldetail , setModaldetail] = useState(false)
  useEffect(()=>{
   LoadUser()
  },[])

  const LoadUser = async()=>{
   let url = hostname + '/order_food/load_Order_user'
   let rs = await axios.get(url)
   setOrderlist(rs.data)
  }
  const handleClose = () => {
    setModaldetail(false);
  };

  const handleChangeReserveData=(e)=>{
   setUser({...user , [e.target.name]: e.target.value})
  }

  const handleChange = (e) => {
   setLevel(e.target.value);
  };

  const detail = (item) => {
    setModaldetail(true)
    setdetail(item)
   };


  const deleteOrder =  (item)=>{
   Swal.fire({
    title: 'จะลบ Order นี้หรือไม่?',
    text: "คุณต้องการลบใช่ไหม!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
     let url = hostname + '/order/delete_order/'+item.id
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
      <TableContainer component={Paper}>
       <Table className={classes.table} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell>ชื่อผู้สั่ง </TableCell>
             <TableCell align="right">โต๊ะ</TableCell>
             <TableCell align="right">สถานะ</TableCell>
             <TableCell align="right"></TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
          {(orderlist.length > 0) ? 
              <>
               {orderlist.map((item) => (
             <TableRow>
               <TableCell component="th" scope="row">
                 {item.customer_name}
               </TableCell>
               <TableCell align="right">{item.customer_table}</TableCell>
               <TableCell align="right">{item.status}</TableCell>
               <TableCell align="right">
                <Button
                    onClick={()=>{deleteOrder(item)}}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
                &nbsp;
                {/* <Button
                    onClick={()=>{detail(item)}}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<DetailsIcon />}
                >
                    รายละเอียด
                </Button> */}
               </TableCell>
             </TableRow>
           ))}
              </>
              :null}
         </TableBody>
       </Table>
     </TableContainer>
     <DetailOrder
      show = {detailorder}
      data = {modaldetail}
      onClose={handleClose}
     />
   </>
  );
}


