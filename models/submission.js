var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new Schema({
    asg_code:String,
    pid: String,
    email: String,
    lang: String,
    source_code: String,
    submit_time: Date,
    time: Number,
    memory: Number,
    result: {status: String, status_detail:String, compile_status:String, tc_passed: Number}
});

module.exports = mongoose.model('Submission', submissionSchema);