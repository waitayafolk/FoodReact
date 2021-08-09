const express = require('express')
const app = express()
const conpool = require("./connect/db_connect");
// const router = express.Router()
var cors = require('cors')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
    res.json({meaasge: 'Hellow World'})
})

app.post('/login' , (req,res)=>{
    // console.log(req.body)
    conpool.query("SELECT * FROM tb_user WHERE username = (?) AND password = (?) AND status = 'use'" , [req.body.username , req.body.password],async(err,result)=>{
        if(err){
            throw Error(err)
        }
        if(result.length > 0){
            res.json({message: "Login Success" , user : result[0]})
           
        }else{
            res.json({message: "Login Fail"})
        }
    })
})

app.post('/user/save_user' , (req,res)=>{

    conpool.query("INSERT INTO tb_user (name , username , password , level , status) VALUE ( (?) ,(?) ,(?) ,(?) , 'use' )",[req.body.name , 
    req.body.username , req.body.password , req.body.level
    ],async(err,result)=>{
        if(err){
            throw Error(err)
        }else{
            res.json({message :'Save Success'})
        }
    })
    // console.log(req.body)
})

app.get('/user/load_user',(req,res)=>{
    // console.log("loaddata")
    conpool.query("SELECT * FROM tb_user WHERE status != 'delete'",[],async(err,result)=>{
        if(err){
            throw Error(err)
        }
        if(result.length > 0 ){
            res.json(result)
        }else{
            res.json({message :'Not fails'})
        }
    })
})

app.get('/user/delete_user/:id',(req,res)=>{

    conpool.query("UPDATE tb_user SET status = 'delete' WHERE id = (?)",[req.params.id] , async(err,result)=>{
        if(err){
            throw Error(err)
        }else{
            res.json({message :'Success'})
        }
    })
})



app.listen(8000, () => {
 console.log('Start server at port 8000.')
})
