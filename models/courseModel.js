const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    isPublished : { type : Boolean, default : false},
    price: Number,
    imageLink : String
})

const Course = mongoose.model('Courses',courseSchema);
module.exports = Course;