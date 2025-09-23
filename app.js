const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
require('dotenv').config();

// MONGOOSE CONNECTION
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Mongodb connected Successfully✅");
  })
  .catch((err) => {
    console.log("Mongodb connection error");    
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");   
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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
        <h1>Ecommerce Home</h1>
        <p>See All Products: <a href="/products">Products</a></p>
      </div>
      <footer class="footer">
        Made by Ishu Agrawal
      </footer>
    </body>
    </html>
  `);
});

app.use(productRoutes);
app.use(reviewRoutes);

// Error handling middleware to catch async route errors and more
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Something went wrong! ${err.message}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
