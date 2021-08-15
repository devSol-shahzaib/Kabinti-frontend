const mongoose = require('mongoose');

const Manager = mongoose.model(
    "Manager",
    new mongoose.Schema({
        fullname:String,
        email:String,
        password:String,
        phone:String,
        address:String
    })
)

module.exports = Manager