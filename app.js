const express = require('express');
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/authRouter');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter);

module.exports = app;