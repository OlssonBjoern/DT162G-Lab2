/* SCHEMA for courses */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var coursesSchema = new Schema({
    courseId: String,
    courseName: String,
    coursePlan: String,
    courseProgression: String,
    courseSemester: String
});

module.exports = mongoose.model("Courses", coursesSchema);