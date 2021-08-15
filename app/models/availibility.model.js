const mongoose = require('mongoose');

const Availability = mongoose.model(
    "Availibilty",
    new mongoose.Schema({
        start_time:String,
        end_time:String,
        created_at:String,
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:'Staff'},
        shift:{type:mongoose.Schema.Types.ObjectId,ref:'Shift'},
        isAccepted:Boolean
    })
)

module.exports = Availability