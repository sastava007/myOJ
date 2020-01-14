const express=require('express');
const router=express.Router();
const submission_controller=require('../controllers/submission_controller');


router.post('/new',submission_controller.post_new_submission);

router.get('/getSubmissionByID/:id', submission_controller.get_submission_details_id);

router.get('/getSubmissionByEmail/:email', submission_controller.get_submission_details_email);

router.get('/getSubmissionByAsg/:asg_code', submission_controller.get_submission_details_asg);

router.get('/getSubmissionByPid/:asg_code/:pid', submission_controller.get_submission_details_pid);

module.exports=router;