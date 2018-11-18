/* IMPORT */
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var jsonfile = require("jsonfile");

/* READ JSONFILE */
var file = "courses.json";
var courses = [];

jsonfile.readFile(file, function(err, obj) {
    if(err) {
        console.log(err);
    } else {
        console.log(obj),
        courses = obj;
    }
})

/* MAKE INSTANCE OF EXPRESS */
var app = express();

// EXAMPLE OF MIDDLEWARE, something you can do inside of loop and then go on to the next thing
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false } ));

//STATIC ROUTE
app.use(express.static(path.join(__dirname, 'public')));

//REST-API for courses (same as routing)

//Send all courses
app.get("/courses", function(req, res) {
    console.log("Send all courses");
    res.send(courses);
});


//Show uniqe id
app.get("courses/course/:id", function(req, res) {
    var getSingleId = req.params.id;
    foundCourse = "No course found";

    //Find right course to show
    for(var i=0; i<courses.length; i++) {
        if(courses[i]._id == getSingleId) {
            res.send({ "message" : "Showing course with ID " + getSingleId});
        }
    }
});



// Add course
app.post("/courses/course/add", function(req, res) {
    //Get next id
    var newId = getNextId(courses);

    //Create new object
    var newCourse = {
        _id: newId,
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        coursePeriod: req.body.coursePeriod        
    }

    //Add to the array
    courses.push(newCourse);

    //Save to file
    saveFile();

    res.redirect("/");


    //res.send({"message": "Adding course"});
});



// Delete course
app.delete("/courses/course/delete/:id", function(req, res) {
    var deleteId = req.params.id;

    //Find right course to delete
    for(var i=0; i<courses.length; i++) {
        if(courses[i]._id == deleteId) {
            courses.splice(i, 1);
        }
    }

    //Save to file
    saveFile();

    res.send({ "message" : "Deleting course with ID " + deleteId});
});

//SAVE JSON-file
function saveFile() {
    jsonfile.writeFile(file, courses, function(err) {
        console.log(err);
    });
}

// Get highest id
function getNextId(arr) {
    var max = 0;

    for(var i=0; i<arr.length; i++) {
        var current = parseInt(arr[i]._id);
        if(current > max) { max = current; }
    }

    return max + 1;
}

// PORT OF CONNECTION
var port = 3000;

// START SERVER
app.listen(port, function() {
    console.log("Server up and running on port " + port);
});