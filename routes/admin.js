const express=require('express');
const router=express.Router();
const admin_controller=require('../controllers/admin_controller');

router.get('/', admin_controller.get_assignment);

router.post('/newAsgn',admin_controller.post_new_assignment);

router.post('/asgn/addProb',admin_controller.post_add_problem);

router.post('/asgn/dropProb',admin_controller.post_drop_problem);

router.put('/asgn/updateAsgn',admin_controller.put_update_assignment);

router.put('/asgn/updateProb',admin_controller.put_update_problem);

router.get('/announcement/:asg_code', admin_controller.get_announcement);

router.post('/announcement', admin_controller.post_announcement);

router.delete('/announcement', admin_controller.delete_announcement);

/* 

router.get('/submission/:sid', admin_controller.get_submission);
router.delete('/deleteallsub/:asg_code', admin_controller.delete_all_submission);

*/

module.exports=router;