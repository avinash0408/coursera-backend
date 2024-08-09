const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const jwtPassword = process.env.JWT_SECRET;

exports.signup = async(req,res)=>{
    const userName = req.body.username;
    const password = req.body.password;
    const name = req.body.name; 
    const isAdmin = req.body.isAdmin;
    const existingUser = await userModel.findOne({username:userName});

    if(existingUser){
        return res.status(400).json({
            message : `User with username ${userName} already exists. Please try with different username`
        })
    }
    await userModel.create({name,username:userName,password,isAdmin});

    res.status(201).json({
        message : `User ${userName} created successfully..!`
    });

}

exports.login = async(req,res)=>{
    const userName = req.body.username;
    const password = req.body.password;

    const existingUser = await userModel.findOne({username:userName});
    if(!existingUser){
         res.status(400).json({
            message : `User with username ${userName} doesn't exist. Please Signup to continue..!`
        })
    }
    else if(await existingUser.comparePasswords(password)){
            const token = jwt.sign({id:existingUser._id},jwtPassword, { expiresIn: '1h' });
            res.cookie("access_token", token, {
                httpOnly: true
              }).status(200).json({
                message :`Welcome ${userName}`,
                token
            });
    }
    else{
        res.status(400).json({
            message : `Please enter valid password for user ${userName}`
        })
    }
}

exports.authenticate = async(req,res,next)=>{
    const token = req.cookies.access_token;
    try{
        const decoded = await jwt.verify(token,jwtPassword);
        const uid = decoded.id;
        let user = await userModel.findOne({_id:uid},'username isAdmin -_id');
        req.username = user.username;
        req.userId = uid;
        req.isAdmin = user.isAdmin;
        if(!user){
            res.status(400).json({
                message : "Invalid token passed! please try again..!"
            });
        }
    }catch(err){
        return res.status(403).send("Invalid Authorization");
    }
    next();
}

exports.logout = (req,res)=>{
    res.clearCookie("access_token").status(200).json({ message: "Successfully logged out" });
}