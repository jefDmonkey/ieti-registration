$(function() {
    const fullname = $("#fullname")
    const course = $("#course")
    const email = $("#email")
    const password = $("#password")
    const contact = $("#contact")
    const address = $("#address")
    const gender = $("input[name=gender]")
    const file = $("#file")
    const img = $("#img")
    let chosenGender = null

    function clearInput() {
        img.attr("src", "/user_images/default.jpg")
        fullname.val("")
        course.val("")
        email.val("")
        password.val("")
        contact.val("")
        address.val("")
        gender.prop("checked", false)
        file.val("")
        chosenGender = null
    }

    img.click(function(e) {
        file.trigger("click")
    })

    file.change(function(e) {
        img.attr("src", URL.createObjectURL(e.target.files[0]))
    })

    $("#registration-form").on("submit", function(e) {
        e.preventDefault()
    })

    gender.change(function(e) {
        chosenGender = $(this).val()
    })

    $("#submit").click(function(e) {
        const current = $(this)

        if(!fullname.val() || !course.val() || !email.val() || !password.val() || !contact.val() || !address.val() || file.prop("files").length <= 0 || !chosenGender) {
             return Swal.fire({
                title: 'Error!',
                text: 'Please fill all required fields',
                icon: 'error',
                confirmButtonText: 'okay'
            })
         
        }
        const capitalizedFullname = fullname.val().toUpperCase();
        const capitalizedCourse = course.val().toUpperCase();
        const capitalizedAddress = address.val().toUpperCase()


        const chosenFile = file.prop("files")[0]

        const formData = new FormData();
        formData.append("fullname", capitalizedFullname)
        formData.append("course", capitalizedCourse)
        formData.append("email", email.val())
        formData.append("password", password.val())
        formData.append("contact", contact.val())
        formData.append("address", capitalizedAddress)
        formData.append("chosenFile", chosenFile)
        formData.append("chosenGender", chosenGender)

        fetch("/admin/submitrequest",
        {
            method: "POST",
            body: formData
        }).then((res) => res.json())
        .then((res) => {
            if(!res.operation) return Swal.fire({
                title: 'Error!',
                text: 'Failed!',
                icon: 'error',
                confirmButtonText: 'okay'
            })

            Swal.fire({
                title: 'Data Sent',
                icon: 'success',
                confirmButtonText: 'okay'
            })

            clearInput()
        })


    })
})