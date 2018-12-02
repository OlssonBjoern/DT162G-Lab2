window.onload = loadCourses();


//Read courses with AJAX
function loadCourses() {
    $.getJSON("http://localhost:3000/courses", function(data) {
        
        //Clear list
        $("#courselist").html("");
        for(var i=0; i<data.length; i++) {
            $("#courselist").append(
                "<li>" + data[i].courseId + " - Name: " + data[i].courseName + " - Course plan: " + data[i].coursePlan + " - Course grade: " + data[i].courseProgression + " Course semester: " + data[i].courseSemester + " | <i class='fas fa-trash-alt' onclick='deleteCourse(\""+ data[i]._id + "\")'></i> | <i class='fas fa-edit' onclick='getSingleCourse(\""+ data[i]._id + "\")'></i></a> </li><br>"
                )
        }

    });
}

function getSingleCourse(id) {
    $.ajax({
        type: "GET",
        url:"http://localhost:3000/courses/course/" + id
    }).done(function(response) {
            $("#editformdiv").show("fast");
            $("#editformdiv").html(
                "<h1>Redigera "+ response.courseId +"</h1><form class='editform' method='post' action='http://localhost:3000/courses/update/'><input type='text' name='editedCourseId' placeholder='"+ response.courseId+"'><br><br><input type='text' name='editedCourseName' placeholder='"+ response.courseName+"'><br><br><input type='text' name='editedCoursePlan' placeholder='"+ response.coursePlan+"'><br><br><input type='text' name='editedCourseProgression' placeholder='"+ response.courseProgression+"'><br><br><input type='text' name='editedCourseSemester' placeholder='"+ response.courseSemester+"'><br><br><input type='submit' value='Edit course'></form>"
            )
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