const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    code:String,
    codeExpires:Date,
    codeCounter: {
        type:Number,
        default:3
    },
    isActive:{
        type:Boolean,
        default:false
    }

})

const User = mongoose.model('User',userSchema);

module.exports = User;