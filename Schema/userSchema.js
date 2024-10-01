const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    profileImage: {
        type: String,
        required: true,
        trim: true
    },
   isAdmin:{
     type:Boolean,
      require:true,
        trim:true
   },
   otp:{
     type:Number,
      trim:true
   },
   address:{
     type:String,
     trim:true
   },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('allBooks', userSchema) 








