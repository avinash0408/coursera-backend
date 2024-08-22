const express = require('express');
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/authRouter');
const courseRouter = require('./routes/courseRouter');
const userRouter = require('./routes/userRouter');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter);
app.use('/course',courseRouter);
app.use('/user',userRouter);

module.exports = app;