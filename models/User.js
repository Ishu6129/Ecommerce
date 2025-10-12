const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    wishList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    cart:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
    ]
});

userSchema.plugin(passportLocalMongoose); // for requiring all properties of password-local-mongoose technique

let User = mongoose.model("User", userSchema);
module.exports=User;