const mongoose=require("mongoose");
const Review = require("./Review");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        trim:true,
        default:"https://4cats.in/wp-content/plugins/elementor/assets/images/placeholder.png"
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    description:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
});

// middleware operation when method called on model
productSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length>0){
       await Review.deleteMany({_id:{$in:product.reviews}});
    }
});


let Product =mongoose.model("Product",productSchema);
module.exports=Product;