const mongoose=require("mongoose");

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

let Product =mongoose.model("Product",productSchema);
module.exports=Product;