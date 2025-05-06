require('dotenv').config();
const express=require('express');
const cors=require('cors');
const router=require('./routes/route')
require('./config/db');

const app=express();
app.use(cors());
app.use(express.json());

app.use(router)

const PORT = process.env.PORT || 8000;


app.listen(PORT,()=>{
    console.log(`Project server started at PORT ${PORT}`);
})

app.get("/",(req,res)=>{
    res.status(200).send(`<h1>Project started and waiting for client request</h1>`)
})

