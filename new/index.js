const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
 const mongoString = process.env.DATABASE_URL
 mongoose.connect(mongoString);
 const database = mongoose.connection
 database.on('error' , (error)=>{
    console.log(error)
 })
 database.once('connected',() =>{
    console.log('Database connected');
 })

 app.use(express.json());



 const dataSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String
    }
 })
 
 const data = mongoose.model('data' , dataSchema)

app.post('/post' , async(req,res) =>{
   //res.send('post api')
  
  const Data = new data ({
    name : req.body.name
   })
   try {
    const dataToSave = await Data.save();
    res.status(200).json(dataToSave)
   }
   catch(error){
    res.status(400).json({message : error.message})
   }
  
})

app.get('/getAll' , async(req,res)=>{
   try{
      const Data = await data.find();
      res.json(Data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

 app.listen(3000,() =>{
    console.log(`server connected at ${3000}`)
 })
/**
 * vms app
 * host 121.0.4.9 port 8080
 * create post 121.0.4.9: 8080/vms/vehicles
 * 
 */