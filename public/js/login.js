$(function(e) {
    const username = $("#username")
    const password = $("#password")
    const forgotPassword = $("#forgot")

    forgotPassword.click(function(e) {
        if(!username.val()) return alert("Please input your email")

        $.ajax({
            type: "POST",
            url: "/forgotPassword",
            data: JSON.stringify({
                email: username.val()
            }),
            headers: {
                "Content-Type": "application/json"
            },
            success: (res) => {
                if(res.operation){
                    alert("Reset password link has been sent to your email")
                }
            },
            error: (error) => {
                console.log(error)
            } 
        })
    })

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