/* const lang = require('../lang'); */
const User = require("../models/account");
const Assignment = require('../models/assignment');

// const ApiHelper =require('../helper/ApiHelper');
const axios =require("axios");

exports.post_new_submission=async function(req,res){

    // const apiHelper = new ApiHelper();
    var config={};

    config.client_secret="92082bff2bb967e7ee444cb32f95782326c6ae86";
    config.time_limit=1;  //your time limit in integer
    config.memory_limit=323244;  //your memory limit in integer
    config.source='print("Hello World")';  //your source code for which you want to use hackerEarth api
    config.input="";  //input against which you have to test your source code
    config.language="Py"; //optional choose any one of them or none
    config.async=1;

    const url="https://api.hackerearth.com/v3/code/run/";
    const result=await axios.post(url,config);
    return res.send(result);
}