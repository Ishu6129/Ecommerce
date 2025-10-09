const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const seedDB = require("./seed");
require('dotenv').config();

const session = require('express-session');
const flash = require('connect-flash');

const passport =require('passport')
const LocalStrategy=require('passport-local')
const User=require('./models/user')



const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");
const authRoutes=require("./routes/auth")


// MONGOOSE CONNECTION
try {
  mongoose.connect(process.env.DB_URL)
    .then(() => {
      console.log("Mongodb connected Successfully✅");
    })
    .catch((err) => {
      console.log("Mongodb connection error");    
      console.log(err);
    });}
  catch(e){
      console.log("Some error occured");
      console.log(e);
}

let configSession=session({
  secret:"thisshould",
  resave:false,
  saveUninitialized:true,
  // cookie:{secure:true}
});

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");   
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));


app.use(configSession);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.ono = req.flash("ono");
  next();
});

app.use(passport.initialize()); // for using paassport feature
app.use(passport.session()); // for local storage
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ecommerce Home</title>
        <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <div class="container">
        <h1>Home</h1>
        <p>See All Products: <a href="/products">Products</a></p>
      </div>
      <footer style="position:fixed; bottom:10px; right:15px; color:grey; font-size:14px;">
        Made by Ishu Agrawal
      </footer>
    </body>
    </html>
  `);
});


//passport
passport.use(new LocalStrategy(User.authenticate()));



// Seed the database with initial data
// seedDB();

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
});
