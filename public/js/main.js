window.onload = loadCourses();


//Read courses with AJAX
function loadCourses() {
    $.getJSON("http://localhost:3000/courses", function(data) {
        
        //Clear list
        $("#courselist").html("");
        for(var i=0; i<data.length; i++) {
            $("#courselist").append(
                "<li>" + data[i].courseId + " - Name: " + data[i].courseName + " - Period: " + data[i].coursePeriod + " | <i class='fas fa-trash-alt' onclick='deleteCourse("+ data[i]._id + ")'></i> </li><br>")
        }

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