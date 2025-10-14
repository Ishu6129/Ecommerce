//1. BASIC IMPORTS

const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config(); // load environment variables

//2. DATABASE (MONGOOSE)

const mongoose = require("mongoose");
try {
  mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.log("❌ MongoDB connection error", err));
} catch (e) {
  console.log("⚠️ Some error occurred", e);
}

//3. VIEW ENGINE + PATHS

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


//4. CORE MIDDLEWARE

const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 


//5. SESSION & FLASH

const session = require("express-session");
const flash = require("connect-flash");

const configSession = session({
  secret: "thisshould",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
});

app.use(configSession);
app.use(flash());


//6. PASSPORT (AUTH)

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//7. GLOBAL VARIABLES (locals)

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.ono = req.flash("ono"); // your custom message type
  next();
});


//8. ROUTES

const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const productApi = require('./routes/api/productapi');
const paymentRoutes = require('./routes/payment');

app.get('/' , (req,res)=>{
    res.render('home');
})

app.get("/terms", (req, res) => {
  res.render("terms");
});

// 🔒 Privacy Policy
app.get("/privacy", (req, res) => {
  res.render("privacy-policy");
});

// 💰 Refund Policy
app.get("/refund", (req, res) => {
  res.render("refund-policy");
});
// app.use(seedDB); // optional seeding file if needed
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);
app.use(paymentRoutes);


//9. SERVER START

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
