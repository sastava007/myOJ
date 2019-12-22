const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Assignment =new Schema({
    asg_code:String,
    email:String,
    created_at:Date,
    deadline:Date,
    course:String,
    name:String,
    solved:[String],
    problems:[
        {
            pid:String,
            name:String,
            description:String,
            time_limit:Number,
            solved:[String],
            avail:Boolean,
            test_cases:[
                {
                    in:String,
                    out:String
                }
            ]
        }
    ]

});

module.exports=mongoose.model('Assignment', Assignment);