## myOJ : An Online Autograding Application


myOJ is an online coding assignment grading application which automates the process of creating assignments, adding coding problems, and judging them in an online environment. This platform allows the professors/ teaching assistants to setup an assignment, add problems to it with specific test cases and time limit ensuring that only efficient solution can pass the test cases and once the deadline is reached it will stop taking any further submission and send a detailed performance report of students to the professor through an automated mail.

Github Repository: https://github.com/sastava007/myOJ

## Features

 - To automate the process of assignment submission and grading. 
 -  To provide a complete solution to per-existing system. 
 - To provide the facility to create online assignments and coding problems which will save a lot of human effort. 
 - As all the submissions will be made online directly on our portal so it will be an environment friendly approach saving a lot of paper work.
 - It will also have feature of MOSS (Measure of Software Similarity) to check level of plagiarism, preventing the students from copying assignments.
 -  Provide a detailed report consisting of statistical information regarding the number of submissions made, no. of accepted solution/ wrong answer/ time limit reached in tabular & graphical format. 
   
## How myOJ works ?
The client side app submits the code and language id to the server through the API. The API then spins up a Docker container for each API request and runs the code using the compiler/interpreter of given language. The program runs inside a virtual machine with limited resources and has a time limit for execution. Once the output is ready, it is sent back to the client as response and docker container is destroyed with all the files from the server.  

## How to setup myOJ ?
 - Make sure you have NodeJS and MongoDB installed locally
 - Fork this repository, please star too.
 - Enter the respective folder, and run *npm install*
 - Fix dependency issues, if any using *npm audit fix*
 - Run *npm run serve*
 - PS: If you can't run it locally, then don't worry we have provided the snapshot of different component in ./Screenshots folder
 

  

## Architecture
To this use this service, all you need is to deploy the Docker file on some free tier server try using (Heroku or Netlify). Once you have deployed your application, all you need is to call the API endpoints from your client application. For better understanding, try seeing the below architecture which is how we are doing at myOJ.
 


<p align="center"> 
<img src="https://i.imgur.com/MWrhP1W.png">
</p>

## Technology Stack
 - Backend : NodeJS + Express
 - VueJS as frontend framework
 - MongoDB as database
 - Code Compilation engine built using Docker & Docker Compose hosted on Heroku 
 

## Team Members
 - Shivansh Srivastava [2018BCS-053]
 - Deep Shah [2018BCS-052]
 - Saurabh Krishan [2018BCS-051]
 - Adarsh Chaurasiya [2018BCS-002]