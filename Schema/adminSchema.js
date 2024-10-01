const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
 phoneNumber:{
   type:Number,
   unique:true,
   required:true
 }
})   
module.exports = mongoose.model('adminSchema', adminSchema) 
