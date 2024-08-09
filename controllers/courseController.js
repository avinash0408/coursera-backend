const courseModel = require('../models/courseModel');
const userModel = require('../models/userModel');


exports.getAllCourses = async(req,res) => {
    var courses = await courseModel.find({});
    res.status(200).json({
        courses
    })
}

exports.addCourse = async(req,res) => {
    if(!req.isAdmin){
        return res.status(403).json({
            message : "You don't have enough privilage to perform this action!"
        })
    }
    const title = req.body.title;
    const description = req.body.description;
    const isPublished = req.body.isPublished;
    const price = req.body.price;

    try{
        const course = await courseModel.create({title,description,isPublished,price});
        res.status(201).json({
            message : `Course ${course} added successfully!`
        })
    }catch(err){
        res.status(400).json({
            message : 'Error occured while adding the course.'
        })
    }
    
}

exports.purchaseCourse = async(req,res) => {
    var courseId = req.params.courseId;
    var uid = req.userId;
    userModel.updateOne({_id:uid},{$push:{purchasedCourses : courseId}}).then(
    function(value){
    res.json({
        message : "Purchase Complete!!"
    });
    },
    function(error){
        console.log(error);
        res.json({
            message : "Couldn't finish the purchase !!"
        })
    })
}

