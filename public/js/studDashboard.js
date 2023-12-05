$(function(e) {
    $("button#register").click(function(e) {
        $.ajax({
            type: "GET",
            url: "/student/checkForm",
            success: (res) => {
                if(!res.operation) return alert("You already have an enrolment form")
                location.href = "/student/studRegistration"
            },
            error: (err) => {
                console.log(err)
                alert("Something went wrong")
            }
        })
    })
})

$("button#subj_taken").click(function(e) {
    location.replace("/student/subjectsTaken")
})