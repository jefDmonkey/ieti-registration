$(function(e) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const pwd = $("#p")
    const npwd = $("#np")
    const reset_btn = $("#reset_password")

    reset_btn.click(function(e) {
       if(!pwd.val() || !npwd.val()) return alert("Complete input")
       if(pwd.val() != npwd.val()) return alert("Password not matched")

       $.ajax({
        type: "POST",
        url: "/changepassword",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            email: params.email,
            newPassword: npwd.val()
        }),
        success: (res) => {
            if(res.operation){
                alert("Password changed")
                location.replace("/login")
            }
        },
        error: (error) => {
            console.log(error)
        }
       })
    })
})