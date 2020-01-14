const User = require("../models/account");
const Assignment = require('../models/assignment');
const Submission=require('../models/submission');

const HackerEarth=require('hackerearth-node');
const api_key=require('../config/keys.json').api_key;

exports.post_new_submission=async function(req,res){

    let hackerearth=new HackerEarth(api_key), time=0, memory=0, compile_status="", status="", status_detail="";

    const getProblemDetails=()=>{
        return new Promise((resolve,reject)=>{
            Assignment.findOne({"asg_code":req.body.asg_code,"problems.pid":req.body.pid},{problems:1},(err,prob)=>{
                err ? reject(err):resolve(prob.problems[0]);
            });
        });
    }

    const runHackerearth=(data,test_case)=>{

        return new Promise((resolve,reject)=>{
            hackerearth.run(data,(err,result)=>{
                if(err)
                return reject(err);
                else
                {
                    result=JSON.parse(result);
                    if(result.compile_status!=="")
                        compile_status=result.compile_status;
                    if(result.run_status.status_detail!=="NA")
                        status_detail=result.run_status.status_detail;
                    if(result.run_status.status!=="")
                        status=result.run_status.status;

                    const verdict=["AC"];
                    if(verdict.includes(result.run_status.status))
                    {
                        result.run_status.output=result.run_status.output.slice(0,-1);
                        time=Math.max(time,result.run_status.time_used);
                        memory=Math.max(memory,result.run_status.memory_used);

                        if(test_case.out === result.run_status.output)
                            return resolve(true);
                        else
                            return resolve(false);
                    }
                }
            });
        });
    }

    var callProblemDetails = async ()=>{

        const problem =await getProblemDetails(); 

        var data={
            source:req.body.source_code,
            language:req.body.language,
            time_limit:problem.time_limit
        }

        for(let i=0;i<problem.test_cases.length;i++)
        {
            data.input=problem.test_cases[i].in;
            const result =await runHackerearth(data,problem.test_cases[i]);
            if(result===false)
            return ([false, i]);
        }
        return ([true, problem.test_cases.length]);
    };

    callProblemDetails().then((result)=>{

        const new_submission =new Submission({
            asg_code:req.body.asg_code,
            pid:req.body.pid,
            email:req.body.email,
            lang:req.body.lang,
            source_code:req.body.source_code,
            submit_time:new Date,
            time,
            memory,
            result:{status, status_detail, compile_status, tc_passed:result[1]}
        });

        new_submission.save((err, submission)=>{
            if(err)
            return res.send(err.message);
            else
            return res.send(submission);
        });
    })
    .catch((err)=>{
        return res.send(err.message)
    });

}