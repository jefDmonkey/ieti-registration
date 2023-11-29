$(function(e) {
    const fname = $("#fname")
    const lname = $("#lname")
    const email = $("#email")
    const phone = $("#phone")
    const msg = $("#msg")
    const form = $('#contact_form')

    //THIS CODE IS FOR CLEAR INPUT
    function clearInput() {
        fname.val("")
        lname.val("")
        email.val("")
        phone.val("")
        msg.val("")
    }

    function sendEmail() {
        const bodyMessage = `Full Name: ${fname.val()}<br> Last Name: ${lname.val()}<br> Email: ${email.val()}<br> Phone Number: ${phone.val()}<br> Message: ${msg.val()}`

        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "jeffandkeiciebelle@gmail.com",
            Password : "2D740458EA400D86738E0291C5DB7D559CFE",
            To : 'jeffandkeiciebelle@gmail.com',
            From : "jeffandkeiciebelle@gmail.com",
            Subject : "This is the subject",
            Body : bodyMessage
        }).then(
          message => alert(message)
        );
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
                sendEmail()
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