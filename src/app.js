const express=require("express")
const cookieParser=require('cookie-parser')

const app=express()

app.use(express.json())
app.use(cookie-parser)

module.exports=app