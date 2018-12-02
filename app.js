/* IMPORT */
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose  = require("mongoose");

/* CONNECT TO DB*/
mongoose.connect("mongodb://localhost:27017/courses", { useNewUrlParser: true } );

//Read schema
var Courses = require("./app/models/courses.js");

/* MAKE INSTANCE OF EXPRESS */
var app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
	next();
});

// EXAMPLE OF MIDDLEWARE, something you can do inside of loop and then go on to the next thing
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false } ));

//STATIC ROUTE
app.use(express.static(path.join(__dirname, 'public')));

//REST-API for courses (same as routing)

//Send all courses
app.get("/courses", function(req, res) {
    Courses.find(function(err, Courses) {
        if(err) {
            res.send(err);
        }

        res.json(Courses);
    });
});


//Show uniqe id
app.get("/courses/course/:id", function(req, res) {
    var singleId = req.params.id;

    Courses.findById(_id = singleId, function(err, Courses) {
        if(err) {
            res.send(err);
        }
        res.json(Courses);
    });
});



// Add course
app.post("/courses/course/add", function(req, res) {

    //New instance of courses
    var course = new Courses();

    //Create new object
    course.courseId = req.body.courseId;
    course.courseName = req.body.courseName;
    course.coursePlan = req.body.coursePlan;
    course.courseProgression = req.body.courseProgression;
    course.courseSemester = req.body.courseSemester;

    //Save course
    course.save(function(err) {
        if(err) {
            res.send(err);
        }
    });

    res.redirect("/");


    //res.send({"message": "Adding course"});
});

app.post("/courses/update/:id", function(req, res) {
    var course = {};

    course.courseId = req.body.editedCourseId;
    course.courseName = req.body.editedCourseName;
    course.coursePlan = req.body.editedCoursePlan;
    course.courseProgression = req.body.editedCourseProgression;
    course.courseSemester = req.body.editedCourseSemester;

    var query = {_id:req.params._id}

    Courses.updateOne(query, course, function(err) {
        if(err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });

});

// Delete course
app.delete("/courses/course/delete/:id", function(req, res) {
    var deleteId = req.params.id;

    Courses.deleteOne({
        _id: deleteId
    }, function(err, Courses) {
        if(err) {
            res.send(err)
        }

        res.json({ message: "Course deleted, id: " + deleteId});
    });
});


// PORT OF CONNECTION
var port = 3000;

// START SERVER
app.listen(port, function() {
    console.log("Server up and running on port " + port);
});