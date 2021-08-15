const mongoose = require('mongoose');

const Staff = mongoose.model(
    "Staff",
    new mongoose.Schema({
        fullname:String,
        email:String,
        password:String,
        phone:String,
        address:String,
        hours_limit:Number,
        hours_worked:Number,
        added_by:{type:mongoose.Schema.Types.ObjectId,ref:'Manager'}
    })
)

module.exports = Staff