var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announcementSchema = new Schema({
    asg_code:String,
    date: Date,
    desc: String
});

module.exports = mongoose.model('Announcement', announcementSchema);