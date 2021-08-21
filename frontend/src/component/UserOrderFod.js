import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { hostname } from './Connect';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import DetailsIcon from '@material-ui/icons/Details';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserOrderFod() {
  const classes = useStyles();
  const [orderlist , setOrderlist] = useState(false)
  const [detailorder , setdetail] = useState(false)
  const [modaldetail , setModaldetail] = useState(false)
  useEffect(()=>{
   LoadOrder()
  },[])
  const LoadOrder = async()=>{
   let url = hostname + '/order_food/load_Order_user'
   let rs = await axios.get(url)
   setOrderlist(rs.data)
  }

  const detail = (item) => {
    setModaldetail(true)
    setdetail(item)
   };

   
   const SuccessOrder =  (item)=>{
    Swal.fire({
     title: 'กำลังนำเสริฟ Order นี้หรือไม่?',
     text: "คุณต้องการลบใช่ไหม!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, delete it!'
   }).then(async(result) => {
     if (result.isConfirmed) {
      let url = hostname + '/order/order_serve/'+item.id
      let rs = await axios.get(url)
      if(rs.data.message == "Success"){
       Swal.fire({
        icon: 'success',
        title: 'Delete Success',
        showConfirmButton: false,
        timer: 1500
       })
       LoadOrder()
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
      LoadOrder()
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
               <TableCell component="th" scope="row" style={{minWidth : 150}}>
                 {item.customer_name}
               </TableCell>
               <TableCell align="right" style={{minWidth : 150}}>{item.customer_table}</TableCell>
               <TableCell align="right" style={{minWidth : 150}}>{item.status}</TableCell>
               <TableCell align="right" style={{minWidth : 300}}>
                  <Button
                      onClick={()=>{SuccessOrder(item)}}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<DetailsIcon />}
                  >
                      เสริฟ
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                      onClick={()=>{detail(item)}}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<DetailsIcon />}
                  >
                      รายละเอียด
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                      onClick={()=>{deleteOrder(item)}}
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
      <Detail
        data={detailorder}
        isOpen={modaldetail}
        isClose={() => setModaldetail(false)}
      />
   </>
  );
}  


function Detail(props) {
  const [Food , setFood] = useState(false)
  const [totalPrice, setTotalPrice] = useState(false);
  const [count , setCount] = useState(0)

  useEffect(()=>{
    LoadFood()
  },[])

  const LoadFood = async()=>{
    console.log(props.data)
    let url = hostname + '/order_detail/load_detailOrder_food/'+props.data.id
    let rs = await axios.get(url)
    setFood(rs.data)
    let Price = 0
    let itemsInproductCount = 0;
    for (let i = 0; i < Food.length; i++) {
      itemsInproductCount += Food[i].qty
      Price += (Number(Food[i].price_food) * Number(Food[i].qty))
      setCount(itemsInproductCount)
      setTotalPrice(Price)
  }

  }
  const derlimiter = (num) =>  {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return (
    <>
    <Dialog open={props.isOpen} maxWidth="lg" onClose={() => props.isClose()} TransitionComponent={Transition} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description" >
      <DialogTitle style={{textAlign:'center'}} id="alert-dialog-title">{"รายการอาหารที่อยู่ในตะกร้า"}</DialogTitle>
        <DialogContent>
          <Button
            onClick={()=>{LoadFood()}}
            variant="contained"
            color="primary"
            >
            ดูรายการ
          </Button>
          
          <DialogContentText id="alert-dialog-description">
            <TableHead>
              <TableRow >
                <TableCell align='center' width='150'>ลำดับ</TableCell>
                <TableCell align='center' width='200'>ชื่อรายการ</TableCell>
                <TableCell align='center' width='200'>ราคา</TableCell>
                <TableCell align='center' width='200'>จำนวน</TableCell>
                <TableCell align='center' width='200'>รวม</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(Food.length > 0 ) ? <>
              {Food.map((item, index) =>
                <TableRow key={index+1}>
                  <TableCell align="center" style={{minWidth : 150}}>{index+1}</TableCell>
                  <TableCell align="center" style={{minWidth : 150}}>{item.name_food} {item.name_food_en}</TableCell>
                  <TableCell align="center" style={{minWidth : 150}}>{derlimiter(item.price_food)}</TableCell>
                  <TableCell align="center" style={{minWidth : 150}}>{item.qty}</TableCell>
                  <TableCell align="center" style={{minWidth : 150}}>{derlimiter(item.qty * item.price_food)}</TableCell>
                </TableRow>
              )}
              </>:null}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell rowSpan={4} />
                <TableCell colSpan={1}></TableCell>
                <TableCell align="center">รวม</TableCell> 
                <TableCell align="center">{count}</TableCell> 
                {(totalPrice > 0 ) ? <>
                  <TableCell align="center">{derlimiter(totalPrice)}</TableCell>
                </>: <TableCell align="center">{derlimiter(0)}</TableCell>}
                
              </TableRow>
            </TableFooter>
          </DialogContentText>
        </DialogContent>
    </Dialog>
    </>
  );
}



