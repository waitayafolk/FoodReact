import React ,{ useEffect , useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Link from '@material-ui/core/Link';
import Swal from 'sweetalert2';
import axios from 'axios';
import { hostname } from './Connect';
import FoodImg from '../asset/image/thaifood.jpg';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let myArray
export default function Orderfood() {
  
  const [count , setCount] = useState(0)
  const [Food , setFood] = useState(false)
  const [open, setOpen] = useState(false);
  const [openerror, setOpenerror] = useState(false);
  const [showModal , setShowModal] = useState(false)
  const [indexFood , setIndexFood] = useState(false)
  const [totalPrice, setTotalPrice] = useState(false);
  const [table , setTable] = useState(false)
  const classes = useStyles();

  useEffect(()=>{
    LoadFood()
    afterAddItem()
  },[])

  const LoadFood =  async() =>{
    let url = hostname + '/food/load_food'
    let rs = await axios.get(url)
    setFood(rs.data)
  }

  const derlimiter = (num) =>  {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const addToCart = (item) => {
    myArray = JSON.parse(localStorage.getItem('itemsInCart'))
    if(myArray === undefined ||myArray === null ){
        myArray = []
        addProductToCart(item)
        return
    }
    if(myArray.length < 0){
    }else{
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].id === item.id) {
                myArray[i].qty += 1;
              return saveTolocal(myArray)
            }
        }
        addProductToCart(item)
    }
  }

  const saveTolocal = (myArray) =>{
      localStorage.setItem('itemsInCart', JSON.stringify(myArray));
      setOpen(true);
      afterAddItem()
  }

  const addProductToCart = (item) =>{
      myArray.push({ 
          id :item.id, 
          qty: 1, 
          price: item.price_food , 
          name_food_en : item.name_food_en,
          name_food: item.name_food,
          detail_food: item.detail_food
      });
      localStorage.setItem('itemsInCart', JSON.stringify(myArray));
      setOpen(true);
      afterAddItem()
  }

  const afterAddItem = () => {
    let itemsInproduct = JSON.parse(localStorage.getItem('itemsInCart'))
    let Price = 0
    let itemsInproductCount = 0;
    if(itemsInproduct == null || itemsInproduct == undefined){
      setCount(0)
      setIndexFood(false)
      setTotalPrice(0)
    }else{
      setIndexFood(itemsInproduct)
        itemsInproductCount = 0;
        for (let i = 0; i < itemsInproduct.length; i++) {
            itemsInproductCount += itemsInproduct[i].qty
            Price += (Number(itemsInproduct[i].price) * Number(itemsInproduct[i].qty))
            setCount(itemsInproductCount)
            setTotalPrice(Price)
        }
    } 
   
  }

  const handleClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenerror(false)
  };

  const handleClosemodal = () => {
    setShowModal(false);
  };

  const handleChangeReserveData=(e)=>{
    setTable({...table , [e.target.name]: e.target.value})
  }

  const RemoveProduct = (item) => {
    for (var i = 0; i < indexFood.length; i++)
    if (indexFood[i].id === item.id) {
      indexFood.splice(i, 1);
      localStorage.setItem('itemsInCart', JSON.stringify(indexFood));
      afterAddItem()
    }
  }


  const SaveOrder = async()=>{

    if(table == false || table.table == "" || table.name == ""){
      setOpenerror(true)
    }else{
      let url = hostname + '/order/save_order'
      let rs = await axios.post(url,{
        customer_name : table.name, 
        customer_table : table.table , 
        food : indexFood
      })
      if(rs.data.message == 'Save Success'){
        localStorage.removeItem('itemsInCart')
        afterAddItem()
        setTable(false)
        setShowModal(false);
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

  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <FastfoodIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
          Kaidee Restaurant
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Kaidee Restaurant
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              สามารถเลือกอาหารที่มีอยู่ได้เลย 
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button onClick={()=>{setShowModal(true)}} variant="contained" color="primary">
                  {count} รายการ
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {(Food.length > 0) ? <>
            <Grid container spacing={4}>
            {Food.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={FoodImg}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {item.name_food} {item.name_food_en}
                    </Typography>
                    <Typography>
                    {item.detail_food}
                    </Typography>
                    <Typography style={{ fontSize : 20  ,  textAlign :'left' , color : '#ff844c'}}>
                    ราคา {derlimiter(item.price_food)}.-
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={()=>{addToCart(item)}}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<ShoppingCartIcon />}
                    >
                      Buy
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          </>:null}
          <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              เพิ่มลงตะกร้าเรียบร้อยเเล้ว !!
            </Alert>
          </Snackbar>

          <Snackbar open={openerror} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              กรุณากรอกข้อมูลให้ครบ !!
            </Alert>
          </Snackbar>
          
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
         ที่อยู่ร้าน .... 
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © Kaidee Restaurant '}
            Your Website Kaidee Restaurant
            
            {new Date().getFullYear()}
            {'.'}
        </Typography>
      </footer>

      <Dialog
          open={showModal}
          maxWidth="lg"
          onClose={handleClosemodal}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
      >
     <DialogTitle style={{textAlign:'center'}} id="alert-dialog-title">{"รายการอาหารที่อยู่ในตะกร้า"}</DialogTitle>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="name"
          label="ชื่อผู้สั่ง"
          name="name"
          type="text"
          onChange={handleChangeReserveData}
        />
        
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="table"
          label="หมายเลขโต๊ะ"
          name="table"
          type="number"
          onChange={handleChangeReserveData}
        />
      </form>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TableHead>
              <TableRow >
                <TableCell align='center' width='150'>ลำดับ</TableCell>
                <TableCell align='center' width='200'>ชื่อรายการ</TableCell>
                <TableCell align='center' width='200'>ราคา</TableCell>
                <TableCell align='center' width='200'>จำนวน</TableCell>
                <TableCell align='center' width='200'>รวม</TableCell>
                <TableCell align='center' width='200'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(indexFood.length > 0 ) ? <>
              {indexFood.map((item, index) =>
                <TableRow key={index+1}>
                  <TableCell align="center">{index+1}</TableCell>
                  <TableCell align="center">{item.name_food} {item.name_food_en}</TableCell>
                  <TableCell align="center">{derlimiter(item.price)}</TableCell>
                  <TableCell align="center">{item.qty}</TableCell>
                  <TableCell align="center">{derlimiter(item.qty * item.price)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={()=>RemoveProduct(item)} style={{textAlign : 'right'}} aria-label="share">
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
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
                        {(totalPrice > 0) ?
                <>
                <TableCell align="center">{derlimiter(totalPrice)}</TableCell>
                </>
                : <TableCell align="center">0</TableCell> }
              </TableRow>
            </TableFooter>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={()=>{SaveOrder()}}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ShoppingCartIcon />}
            >
            ยืนยันสั่งออร์เดอร์
          </Button>
        </DialogActions>
        
      </Dialog>

    </React.Fragment>
  );
}