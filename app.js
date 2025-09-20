const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const seedDB = require("./seed");



// MONGOOSE CONNECTION
mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(()=>{
    console.log("Mongodb connected Successfully✅");
}).catch((err)=>{
    console.log("Mongodb connection error");    
    console.log(err);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



app.get("/",(req,res)=>{
    res.send("home");
});

// SEEDING THE DATABASE
// seedDB();  

app.listen(3000,()=>{
    console.log(`Server started at port 3000🚀: http://localhost:3000`);  
})