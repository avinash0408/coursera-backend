const courseModel = require('../models/courseModel');
const userModel = require('../models/userModel');

exports.getUserPurchasedCourses = async(req,res) => {
    const uid = req.userId;
    let uCourses = (await userModel.findOne({_id:uid}).select('purchasedCourses -_id')).purchasedCourses;
    let courseNames = await courseModel.find({_id:{
        $in:uCourses
    }}).select('-_id -__v');
    res.status(200).json({
        message:courseNames
    });
}