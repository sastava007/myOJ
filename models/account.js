var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    username: {type: String, unique:true},
    name: String,
    password: String,
    email: {type: String, unique:true},
    permission: String,
    assignment:{ type:[mongoose.Schema.Types.ObjectId], required:false }
});



module.exports = mongoose.model('User', Account);