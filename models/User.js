const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type :String,
        required: true
    },
    email:{
        type :String,
        required: true,
        unique: true
    },
    password:{
        type :String,
        required: true
    },
    country:{
        type :String,
        required: true
    },
    img:{
        type: String,
    },
    city:{
        type: String,
        required:true
    },
    idAdmin:{
        type:Boolean,
        default:false
    }
}, {timestamps: true})


module.export = mongoose.model('User',userSchema)