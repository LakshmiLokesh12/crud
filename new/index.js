const express = require('express');
const mongoose = require('mongoose');
const app = express();
 const mongoString = process.env.DATABASE_URL
 mongoose.connect(mongoString);
 const database = mongoose.connectiondatabase.on('error' , (error)=>{
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
const user = mongoose.model('data' , dataSchema)
app.post('/post' , async(req,res) =>{
   // res.send('post api')
   const data = new Model ({
    name : req.body.name
   })
   try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
   }
   catch(error){
    res.status(400).json({message : error.message})
   }
})
 app.listen(3000,() =>{
    console.log(`server connected at ${3000}`)
 })
