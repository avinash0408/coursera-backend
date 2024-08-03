const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const app = require('./app');

mongoose.connect(process.env.DB_URL).then(
    (conn)=>{
        console.log("DB Connection Success!!");
    }
).catch((err)=>{
    console.log("Error occured while connecting to Database !");
});

app.listen(3000,()=>{
    console.log('Listening to port:3000');
});