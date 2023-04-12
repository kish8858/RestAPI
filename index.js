import express from "express";


const app = express();
 app.listen(5000,()=>{
    console.log("Served")
 });

 app.get("/",(req,res)=>{
    // res.send("Hi") //we can be send data in the body.
    //res.sendStatus(404);
    res.json({
        success : true,
        products : []
    })
 })