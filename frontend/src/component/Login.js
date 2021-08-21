import React , {useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {hostname} from './Connect'
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const [user , setUser] = useState()
  const classes = useStyles();
  const History = useHistory();

  const login_user = async() => {
   let url = hostname + '/login';
   let rs = await axios.post(url,{username :  user.username , password : user.password})
   if(rs.data.message == "Login Success"){
    localStorage.setItem('User',JSON.stringify(rs.data.user))
    Swal.fire({
     icon: 'success',
     title: 'Login Success',
     showConfirmButton: false,
     timer: 1500
    })
    History.push('/users')
   }else{
    Swal.fire({
     icon: 'error',
     title: 'Login Fails',
     showConfirmButton: false,
     timer: 1500
    })
   }
  }
  const handdeluse =(e)=>{
   setUser({...user, [e.target.name] : e.target.value})
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="username"
            autoFocus
            onChange={handdeluse}
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
            autoComplete="current-password"
            onChange={handdeluse}
          />
         
          <Button
            onClick={()=>{login_user()}}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}