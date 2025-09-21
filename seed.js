const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name:"Nokia 1100",
        image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTe-1lplZfsc3kR9_Bl772927lWXDbiE9j7FPHMjN5EU43-2b83VeWS1FpF3KiL1vlyaRfczstl6Ur-sXZz5pyzMu9yp3NuXA",
        price:2000,
        description:"A basic phone with long battery life"
    },
    {
        name:"Crucial 16GB DDR4 3200Mhz Laptop RAM",
        image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRMCjI_uranfdaZlZcTw6nCekKueXJyiOOnRPBnTh0GaEKJaf5erkHmO4xLaXZK2E4nzdnIotDscXHbqZwP2w9Cg2YQ9RGRfH2Qif46mkA",
        price:4500,
        description:"High performance RAM for laptops"
    },
    {
        name:"Sony WH-1000XM4 Wireless Noise-Cancelling Headphones",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzbOZHGwVv1vbqLPUwX7gvq--lysvau5zFrg&s",
        price:25000,
        description:"Top-notch noise-cancelling headphones with superior sound quality"
    },
    {
        name:"Xiaomi 138 cm (55 inch) FX Ultra HD 4K Smart LED Fire TV L55MB-FIN",
        image:"https://m.media-amazon.com/images/I/71mA83yc8xL._AC_UY327_FMwebp_QL65_.jpg",
        price:40000,
        description:"A smart TV with stunning 4K display and integrated Fire TV experience"
    },
    {
        name:"Apple MacBook Air 2025 M1 Chip with 8GB RAM and 256GB SSD",
        image:"https://m.media-amazon.com/images/I/711NKCLZfaL._AC_UY327_FMwebp_QL65_.jpg",
        price:100000,
        description:"Lightweight and powerful laptop with M1 chip for everyday tasks"
    },
];

async function seedDB(){
    await Product.insertMany(products);
    console.log("DB Seeded Successfully✅");
}

module.exports=seedDB;