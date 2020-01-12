const express=require('express');
const router=express.Router();
const submission_controller=require('../controllers/submission_controller');


router.post('/new',submission_controller.post_new_submission);












module.exports=router;