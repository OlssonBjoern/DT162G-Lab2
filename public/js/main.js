window.onload = loadCourses();


//Read courses with AJAX
function loadCourses() {
    $.getJSON("http://localhost:3000/courses", function(data) {
        
        //Clear list
        //$("#courselist").html("");
        for(var i=0; i<data.length; i++) {
            $("#courselist").append(
                "<li>" + data[i].courseId + " " + data[i].courseName + " " + data[i].coursePeriod + " <button onclick='deleteCourse("+ data[i]._id + ")'>Delete</button> <button onclick='getSingleCourse("+ data[i]._id + ")'>Show course</button> </li>")
        }

    });
}

function getSingleCourse(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/courses/course/" + id 
    }).done(function(response) {
        console.log(response);
    });
}

function deleteCourse(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/courses/course/delete/" + id 
    }).done(function(response) {
        console.log(response);

        //Reload list
        loadCourses();
    });
}