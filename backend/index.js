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

app.post('/type_food/save_type_food' , (req,res)=>{

    conpool.query("INSERT INTO tb_group_food (group_food_code , name_group_food , name_group_food_en , status) VALUE ( (?) ,(?) ,(?) , 'use' )",
    [req.body.group_food_code , req.body.name_group_food , req.body.name_group_food_en 
    ],async(err,result)=>{
        if(err){
            throw Error(err)
        }else{
            res.json({message :'Save Success'})
        }
    })
})

app.get('/type_food/load_type_food',(req,res)=>{
    conpool.query("SELECT * FROM tb_group_food WHERE status != 'delete'",[],async(err,result)=>{
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

app.get('/type_food/delete_type_food/:id',(req,res)=>{
    conpool.query("UPDATE tb_group_food SET status = 'delete' WHERE id = (?)",[req.params.id] , async(err,result)=>{
        if(err){
            throw Error(err)
        }else{
            res.json({message :'Success'})
        }
    })
})

app.post('/food/save_food' , (req,res)=>{
    // console.log(req.body)
    conpool.query("INSERT INTO tb_food (name_food , name_food_en , price_food ,detail_food , status) VALUE ( (?) ,(?) ,(?)  , (?) , 'use' )",
    [req.body.name_food , req.body.name_food_en , req.body.price_food  ,  req.body.detail_food
    ],async(err,result)=>{
        if(err){
            throw Error(err)
        }else{
            res.json({message :'Save Success'})
        }
    })
})

app.get('/food/load_food',(req,res)=>{
    conpool.query("SELECT * FROM tb_food WHERE status != 'delete'",[],async(err,result)=>{
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

app.get('/food/delete_food/:id',(req,res)=>{
    conpool.query("UPDATE tb_food SET status = 'delete' WHERE id = (?)",[req.params.id] , async(err,result)=>{
        if(err){
            throw Error(err)
        }else{
            res.json({message :'Success'})
        }
    })
})

app.post('/order/save_order' , (req,res)=>{
    conpool.query("INSERT INTO tb_order (customer_name , customer_table , status) VALUE ( (?) ,(?) , 'wait' )",
    [req.body.customer_name , req.body.customer_table],async(err,result)=>{
        if(err){
            throw Error(err)
        }else{
            let id_order = result.insertId
            let query = "INSERT INTO `tb_order_detail`(`id_order`, `food_id`, `qty`,`status`)  VALUES(?)";
                    for (const item of req.body.food) {
                        await conpool.query(query, [
                            [
                                id_order,
                                item.id , 
                                item.qty , 
                                'use'
                            ]
                        ]);
                    }
            res.json({message :'Save Success'})
        }
    })
})

app.get('/order_food/load_Order_user',(req,res)=>{
    conpool.query("SELECT * FROM tb_order WHERE status != 'delete'",[],async(err,result)=>{
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

app.get('/order/delete_order/:id',(req,res)=>{
    conpool.query("UPDATE tb_order SET status = 'delete' WHERE id = (?)",[req.params.id] , async(err,result)=>{
        if(err){
            throw Error(err)
        }else{
            res.json({message :'Success'})
        }
    })
})

app.get('/order/order_serve/:id',(req,res)=>{
    conpool.query("UPDATE tb_order SET status = 'success' WHERE id = (?)",[req.params.id] , async(err,result)=>{
        if(err){
            throw Error(err)
        }else{
            res.json({message :'Success'})
        }
    })
})

app.get('/order_detail/load_detailOrder_food/:id',(req,res)=>{
    conpool.query(`SELECT tb_order_detail.* , tb_food.name_food , tb_food.name_food_en , tb_food.price_food 
                    FROM tb_order_detail 
                    LEFT JOIN tb_food on tb_food.id = tb_order_detail.food_id
                    WHERE tb_order_detail.id_order = (?) AND  tb_order_detail.status != 'delete'`,[req.params.id] , async(err,result)=>{
        if(result.length > 0 ){
            res.json(result)
        }else{
            res.json({message :'Not fails'})
        }
    })
})



app.listen(8000, () => {
 console.log('Start server at port 8000.')
})
