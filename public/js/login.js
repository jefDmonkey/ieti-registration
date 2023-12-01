$(function(e) {
    const username = $("#username")
    const password = $("#password")

    $("#login").click(function(e) {
        $.ajax({
            type: "POST",
            url: "/login",
            headers: {
                "Content-Type": "application/json" 
            },
            data: JSON.stringify({
                username: username.val(),
                password: password.val()
            }),
            success: (res) => {
                if(res.operation){
                    if(res.msg == "student"){
                        location.replace("/student/studDashboard")
                    }else{
                        location.replace("/adminDashboard")
                    }
                }else{
                    alert(res.msg)
                }
            },
            
        })
    })    
})