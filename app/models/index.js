const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db= {};
db.mongoose = mongoose;

db.manager = require('./manager.model');
db.staff= require('./staff.model');
db.availbilty = require('./availibility.model');
db.shift = require('./shift.model');


module.exports = db;  
