const express=require('express');
const router=express.Router();
const passport = require('passport');
const jwt=require('jsonwebtoken');
const auth_controller=require('../controllers/auth_controller');

router.post('/login',auth_controller.post_login);


router.post('/register',auth_controller.post_register);

router.get('/profile',passport.authenticate('jwt',{session:false}),auth_controller.get_profile);

module.exports=router;