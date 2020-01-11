/* const lang = require('../lang'); */
const User = require("../models/account");
const Assignment = require('../models/assignment');
const Announcement=require('../models/announcement');


/* const Submission = require('../models/submission');
const Announcement = require('../models/announcement'); */


exports.get_assignment=async function(req,res){

    let assignments=await User.findOne({email:req.headers.email}, {assignment:1});
    const result=[];

    if(assignments)
    {
            assignments=assignments.assignment;
            for(const element of assignments)
            {
                await Assignment.findOne({_id:element})
                    .then((asgn)=>{
                        result.push(asgn);
                    })
                    .catch((err)=>{console.log(err.message)});
            }
            res.status(200).send(result);
    }
    else
    return res.status(400).send({message:"No assignment found"});
}

exports.post_new_assignment =async function(req,res){

    const new_asgn=new Assignment({
        asg_code:req.body.asg_code,
        email:req.body.email,
        created_at:new Date,
        deadline:req.body.deadline,
        course:req.body.course,
        name:req.body.name
    });

    new_asgn.save((err,assignment)=>{
        if(err)
            return res.send(err.message);
        else
        {
            User.update({email:req.body.email},{$push:{assignment:assignment._id}},(err,result)=>{
                if(err)
                return res.send(err.message);
                else
                {   
                    console.log(assignment);
                    return res.status(200).send({assignment:assignment});
                }
            });  
        }
    });
}


exports.post_add_problem=async function(req,res){

    if (!req.body.hasOwnProperty('test-input')) {
        return res.status(400).send({message: 'Empty testcase'});
    }
    var testcases = [];

    for (var i=0;i<req.body['test-input'].length;i++) {
        testcases.push({in: req.body['test-input'][i], out: req.body['test-output'][i]})
    }

    const new_prob = {
        pid: req.body.pid,
        name: req.body.name,
        desc: req.body.desc,
        time_limit: req.body.time_limit,
        avail: true,
        test_cases:testcases
    };

    console.log(new_prob.desc);

    Assignment.updateOne({asg_code:req.body.asg_code},{$push:{problems:new_prob}}, {new:true},(err,asgn)=>{

        if(err)
        return res.send(err.message);
        else
        return res.status(200).send({assignment:asgn});
    })
}


exports.post_drop_problem= async function(req,res){
    Assignment.updateOne({asg_code:req.body.asg_code},{$pull:{"problems":{pid:req.body.pid}}},{new:true},(err,asgn)=>{
        if(err)
        return res.send(err.message);
        else
        return res.status(200).send({assignment:asgn});
    });
}


exports.put_update_assignment =async function(req,res){

    Assignment.updateOne({asg_code:req.body.asg_code},{$set:{name:req.body.name,course:req.body.course,deadline:req.body.deadline}},{new:true},(err,asgn)=>{

        if(err)
        return res.send(err.message);
        else
        return res.status(200).send({assignment:asgn});
    })
}


exports.put_update_problem =async function(req,res){

    if (!req.body.hasOwnProperty('test-input')) {
        return res.status(400).send({message: 'Empty testcase'});
    }
    var testcases = [];

    for (var i=0;i<req.body['test-input'].length;i++) {
        testcases.push({in: req.body['test-input'][i], out: req.body['test-output'][i]})
    }

    Assignment.updateOne({"asg_code":req.body.asg_code,"problems.pid":req.body.pid},{$set:{"problems.$.name":req.body.name, "problems.$.desc":req.body.desc, "problems.$.time_limit":req.body.time_limit, "problems.$.test_cases":testcases}},{new:true},(err,asgn)=>{

        if(err)
        return res.send(err.message);
        else
        return res.status(200).send({assignment:asgn});
    })
}


exports.get_announcement =async function(req,res){

    Announcement.find({asg_code:req.params.asg_code},(err,announcements)=>{
        if(err)
        return res.send(err.message);
        else
        return res.status(200).send(announcements);
    });
}


exports.post_announcement =async function(req,res){

    var new_announcement = new Announcement({
        date: new Date,
        asg_code:req.body.asg_code,
        desc: req.body.desc
    });

    new_announcement.save((err,announcement)=>{
        if(err)
        return res.send(err.message);
        else
        return res.status(200).send(announcement);
    });
}


exports.delete_announcement = async function(req,res){
    Announcement.deleteOne({_id:req.body.id},(err,announcement)=>{
        if(err)
        return res.send(err.message);
        else
        return res.status(200).send(announcement);
    });
}