import mongoose from "mongoose";

const shoppingSchema = mongoose.Schema({

    itemName:{
        type : String,
        required : true,
    },
    quantity:{
        type : Number,
        required:true,
    },
    unit:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },

},{timestamps:true});

const Shopping = mongoose.model("Shopping",shoppingSchema);
export default Shopping;