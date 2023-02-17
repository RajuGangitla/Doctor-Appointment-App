import mongoose from "mongoose";

const UserScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name'],
        minlength:3,
        trim:true
    },
    email:{
        type:String,
        required:[true, 'Please provide a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please provide a password'],
        minlength:5,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[]
    },
    seenNotification:{
        type:Array,
        default:[]
    }
})

export default mongoose.model('User',UserScheema)