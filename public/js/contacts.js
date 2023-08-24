$(function(e) {
    const fname = $("#fname")
    const lname = $("#lname")
    const email = $("#email")
    const phone = $("#phone")
    const msg = $("#msg")

    function clearInput() {
        fname.val("")
        lname.val("")
        email.val("")
        phone.val("")
        msg.val("")
    }

    $("#send-btn").click(function(e) {

        if(!fname.val() || !lname.val() || !email.val() || !phone.val() || !msg.val()) return alert("Please complete all fields!")

        if(phone.val().length > 11 || phone.val().length < 11) return alert("Invalid phone number")

        $.ajax({
            type: "POST",
            url: "/api/contact",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                fname: fname.val(),
                lname: lname.val(),
                email: email.val(),
                phone: phone.val(),
                msg: msg.val()
            }),
            success: ({ operation }) => {
                if(operation) alert("MESSAGE SENT")
                clearInput()
            },
            error: (err) => {
                alert("THERE WAS AN ERROR")
                console.log(err)
            }
        })

    })

    $("form").submit(function(e){
        e.preventDefault()
    })

})