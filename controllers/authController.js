const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const jwtPassword = process.env.JWT_SECRET;

exports.signup = async(req,res)=>{
    const userName = req.body.username;
    const password = req.body.password;
    const name = req.body.name; 
    const existingUser = await userModel.findOne({username:userName});

    if(existingUser){
        return res.status(400).json({
            'msg': `User with username ${userName} already exists. Please try with different username`
        })
    }
    await userModel.create({name,username:userName,password});

    res.status(201).json({
        "msg": `User ${userName} created successfully..!`
    });

}

exports.login = async(req,res)=>{
    const userName = req.body.username;
    const password = req.body.password;

    const existingUser = await userModel.findOne({username:userName});
    if(!existingUser){
         res.status(400).json({
            'msg': `User with username ${userName} doesn't exist. Please Signup to continue..!`
        })
    }
    else if(await existingUser.comparePasswords(password)){
            const token = jwt.sign({id:existingUser._id},jwtPassword, { expiresIn: '1h' });
            res.cookie("access_token", token, {
                httpOnly: true
              }).status(200).json({
                'msg':`Welcome ${userName}`,
                token
            });
    }
    else{
        res.status(400).json({
            'msg': `Please enter valid password for user ${userName}`
        })
    }
}

exports.authenticate = async(req,res,next)=>{
    const token = req.cookies.access_token;
    try{
        const decoded = await jwt.verify(token,jwtPassword);
        const uid = decoded.id;
        let user = await userModel.findOne({_id:uid},'username -_id');
        req.username = user.username;
        if(!user){
            res.status(400).json({
                'msg':"Invalid token passed! please try again..!"
            });
        }
    }catch(err){
        return res.status(403).send("Invalid Authorization");
    }
    next();
}

exports.logout = async(req,res)=>{
    res.clearCookie("access_token").status(200).json({ message: "Successfully logged out" });
}