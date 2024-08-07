const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    name : String,
    createdOn: { type: Date, default: Date.now },
    purchasedCourses : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Courses'
    }]
});

userSchema.pre('save',async function(next){
    const curPass = await bcrypt.hash(this.password,12);
    this.password = curPass;
    next();
})

userSchema.methods.comparePasswords = async function(plainPassword){
    return await bcrypt.compare(plainPassword,this.password);
}

const User = mongoose.model('Users',userSchema);

module.exports = User;