import express from "express";
import path, { resolve } from 'path'; 
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

mongoose.connect('mongodb://localhost:27017',{
   dbName : "backend"
}).then(()=> console.log("Database is connected")).catch((e)=>console.log("Something went wrong"));

const userSchema = new mongoose.Schema({
   name : String,
   email : String,
   password : String
});

const Users = mongoose.model("User",userSchema);

const app = express();
 app.listen(3000,()=>{
    console.log("Served")
 });


 app.set("view engine", "ejs");
 app.set("views", path.join(path.resolve(), "views"));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))        //(to extract data from req.body)
 app.get('/add',async (req,res) =>{
   await messge.create({name: "Kishan",email :"Kishan@gmail.com"})
      res.send("nice");
   
 });
 
 const isAuthenticated = async(req,res,next)=>{        //make middleware
   const  {token} = req.cookies;
   if(token){
      const decoded = jwt.verify(token,"adsafsdad");
      console.log(decoded);
      req.usseerr = await Users.findById(decoded._id);
      next();

   }
   else{
      res.redirect("/login");
   }
 }


 app.get("/",isAuthenticated,(req,res)=>{
    // res.send("Hi") //we can be send data in the body.
    //res.sendStatus(404);
    // res.json({
    //     success : true,
    //     products : []
    // })

    //res.status(400).send("Found NA HAwe")
   //  fs.readFile("./index.html")
   //  res.sendFile()

   // const pathlocation = path.resolve();
   //console.log(path.join(pathlocation, "./index.html"))
   //res.sendFile(path.join(pathlocation,"./index.html"));
   console.log(req.usseerr);
   res.render("logout",{name :req.usseerr.name});


 });

 app.get("/register",(req,res)=>{

  console.log(req.usseerr);
  res.render("register");
});

 app.post("/register",async(req,res)=>{

   let bdy = req.body;
   console.log(bdy);
   const {name,email,password}= req.body;
   let user = await Users.findOne({email});
   if(user){
      return res.redirect("/login")
   }

    user = await Users.create({
      name,email,password
   });
   const token = jwt.sign({_id : user._id},"adsafsdad")
console.log(token);
   res.cookie("token", token,{
      httpOnly : true,
      expires : new Date(Date.now() + 60*1000)
   });
   res.redirect("/");
 });

app.get("/login",(req,res)=>{
   res.render("login");
});


app.post("/login",async(req,res)=>{
   const {email,password} = req.body;
   let user = await Users.findOne({email});
   if(!user){
      res.redirect("/register")
   }
   const isMatch = user.password === password;
   if(!isMatch){
      return res.render("login", {message : "Incorrect Password"});
   }
   const token = jwt.sign({_id : user._id},"adsafsdad")
console.log(token);
   res.cookie("token", token,{
      httpOnly : true,
      expires : new Date(Date.now() + 60*1000)
   });
   res.redirect("/");
})
  
 app.get("/logout",(req,res)=>{
   res.cookie("token", null,{
      httpOnly : true,
      expires : new Date(Date.now())
   });
   res.redirect("/");
 });

