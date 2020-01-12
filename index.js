const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const appConfig = require("./config/keys.json");

/* initialize the app */
const app = express();

/* middleswares */
//form data middlesware
app.use(bodyParser.urlencoded({ extended: false }));
//json body middlesware
app.use(bodyParser.json());
//cors middlesware
app.use(cors());
//use passport middlesware
app.use(passport.initialize());
//bring the passport strategy
require("./config/passport.js")(passport);

const server_port = process.env.PORT || appConfig.server_port;
const session_secret = process.env.SESSION_SECRET || appConfig.session_secret;
const db_user = process.env.DB_USER || appConfig.db_user;
const db_pass = process.env.DB_PASS || appConfig.db_pass;
const connection_string = process.env.DB_STR || appConfig.connection_string;

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(err => {
    console.log(err.message);
  });

  const index_route=require('./routes/index');
  const admin_route=require('./routes/admin');
  const submission_route=require('./routes/submission');
  
  // const problem_route=require('./routes/problems');

  app.use('/api/index',index_route);
  app.use('/api/admin',admin_route);
  app.use('/api/submission',submission_route);

  // app.use('/problems',problem_route);

  app.listen(server_port,()=>{console.log(`Server started on port ${server_port}!`)});