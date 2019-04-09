const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')


const app = express();
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user',userRouter)


/* app.get('/',function(req,res){
    return res.json({code:1})
}) */
app.listen("9093",function(){
    console.log("haole")
    
}) 
 

