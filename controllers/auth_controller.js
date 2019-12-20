var User = require("../models/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const secret = require("../config/keys.json").secret;

exports.post_register = function(req, res) {
  let {
    name,
    username,
    email,
    password,
    confirmPassword,
    permission
  } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({
      msg: "Password doesn't match"
    });
  }

  function isValidEmail(input) {
    const emails = [
      /^bcs_[0-9]+@iiitm.ac.in$/,
      /^imt_[0-9]+@iiitm.ac.in$/,
      /^ipg_[0-9]+@iiitm.ac.in$/
    ];

    for (var i = 0; i < emails.length; i++) {
      if (emails[i].test(input)) return true;
    }
    return false;
  }

  if (permission !== "admin") {
    if (!isValidEmail(email))
      return res.status(400).json({
        msg: "Invalid Email Id"
      });
  }

  let alreadyExits = false;

  //check for unique username
  User.findOne({ username: username }).then(user => {
    if (user) {
      alreadyExits = true;
      return res.status(400).json({
        msg: "Username already exists!"
      });
    }
  });
  //check for unique email
  User.findOne({ email: email }).then(user => {
    if (user) {
      alreadyExits = true;
      return res.status(400).json({
        msg: "Email already registered!"
      });
    }
  });

  if (alreadyExits===false) {
        let newUser = new User({ name, username, email, password, permission });
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is registered!"
                });
                });
            });
        });
  }
};

exports.post_login = function(req, res) {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(404).json({
        msg: "User doesn't exists",
        success: false
      });
    }
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({
          msg: "Incorrect Password!",
          success: false
        });
      }
      const payload = {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        permission: user.permission
      };
      jwt.sign(payload, secret, { expiresIn: 604800 }, (err, token) => {
        res.status(200).json({
          token: `Bearer ${token}`,
          success: true,
          user: user,
          msg: "You are logged in!"
        });
      });
    });
  });
};

exports.get_profile = function(req, res) {
  return res.json({
    user: req.user
  });
};
