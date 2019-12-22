/* const lang = require('../lang'); */
const User = require("../models/account");
const Assignment = require('../models/assignment');
/* const Submission = require('../models/submission');
const Announcement = require('../models/announcement'); */


exports.get_assignment=async function(req,res){

    //first get list of all assignments created by our user

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
            return res.send({message:"Couldn't create new"});
        else
        {
            User.update({email:req.body.email},{$push:{assignment:assignment._id}},(err,result)=>{
                if(err)
                return res.send({message:"Couldn't add assignment to users table"});
                else
                {   
                    console.log(assignment);
                    return res.status(200).send({assignment:assignment});
                }
            });  
        }
    });
}

exports.post_new_problem=async function(req,res){

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

    Assignment.updateOne({asg_code:req.body.asg_code},{$push:{problems:new_prob}},(err,asgn)=>{

        if(err)
        return res.send({message:"Couldn't add problem to given assignment"});
        else
        return res.status(200).send({assignment:asgn});
    })
}