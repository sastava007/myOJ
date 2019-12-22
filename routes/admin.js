const express=require('express');
const router=express.Router();
const admin_controller=require('../controllers/admin_controller');

router.get('/', admin_controller.get_assignment);

router.post('/newasgn',admin_controller.post_new_assignment);

router.post('/asgn/newprob',admin_controller.post_new_problem);

/* router.put('/updateasgn/:asg_code',admin_controller.put_update_assignment);

router.delete('/asgn/prob/:asg_code/:pid',admin_controller.post_new_problem);

router.get('/submission/:sid', admin_controller.get_submission);

router.delete('/deleteallsub/:asg_code', admin_controller.delete_all_submission);

router.post('/announcement/:asg_code', admin_controller.post_announcement);

router.get('/announcement/delete/:asg_code', admin_controller.delete_all_announcement); */

module.exports=router;