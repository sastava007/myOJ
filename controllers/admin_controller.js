/* const lang = require('../lang'); */
const User = require("../models/account");
const Assignment = require('../models/assignment');
/* const Submission = require('../models/submission');
const Announcement = require('../models/announcement'); */


exports.get_admin=async function(req,res){

    //first get list of all assignments created by our user
    const assignments=await User.find({email:req.body.email}, {assignment:1});
    const result=[];

    if(assignments)
    {
        console.log(assignments);
            assignments.forEach(element => {
            const res=Assignment.findById(element);
            result.push(res);
        });

        return res.status(200).send({Assignments: result});
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