const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const seedDB = require("./seed");
const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");




// MONGOOSE CONNECTION
mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(()=>{
    console.log("Mongodb connected Successfully✅");
}).catch((err)=>{
    console.log("Mongodb connection error");    
    console.log(err);
});

app.engine("ejs",ejsMate);
app.set("view engine","ejs");   
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// SEEDING THE DATABASE
// seedDB();  

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ecommerce Home</title>
            <link rel="stylesheet" href="/styles.css"> <!-- Link to the CSS file -->
        </head>
        <body>
            <div class="container">
                <h1>Ecommerce Home</h1>
                <p>See All Products: <a href="/products">Products</a></p>
            </div>
        </body>
        </html>
    `);
});


app.use(productRoutes);
app.use(reviewRoutes);

app.listen(3000,()=>{
    console.log(`Server started at port 3000\n http://localhost:3000`);  
})