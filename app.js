const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
// const authRouter= require('./routes/auth.js');
// const userRouter = require('./routes/users.js');
const linksRouter = require('./routes/links.js');
require("dotenv").config();

const app= express();
app.use(bodyParser.json({ strict: false }));

app.use(cors());

// app.use("/auth", authRouter);

// app.use("/", userRouter);

app.use("/", linksRouter);

app.use((req, res, next) => {
    res.status(404).json({ success:true, error: "Not found" });
  });

app.use((err, req, res, next)=>{
const{status=500, message= "Server error"}=err;
res.status(status).json({message});
});



	
module.exports.handler = serverless(app);
