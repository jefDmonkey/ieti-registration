$(function(e) {
    const subject_code = $("#code")
    const subject_name = $("#subjects")
    const subject_units = $("#unit")
    const subject_year = $("#year")
    const subject_sem = $("#semester")
    const courses = $("#courses")

    function clearInput() {
        subject_code.val("")
        subject_name.val("")
        subject_units.val("")
        subject_year.prop("selectedIndex", 0)
        subject_sem.prop("selectedIndex", 0)
        $('#courses').val(null).trigger('change');
    }

    $("#courses").select2({
        placeholder: "Select Courses"
    });

    $("table.list tbody").on("click", "button.btndel", function(e) {
        const current = $(this)
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
            },
            buttonsStyling: true,
          });

          swalWithBootstrapButtons
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
        .then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "DELETE",
                    url: `/admin/deleteSubject?code=${current.attr("id")}`,
                    success: (res) => {
                        if(!res.operation) return alert("Something went wrong")
        
                        current.closest("tr").remove()
        
                        swalWithBootstrapButtons.fire(
                            "Deleted!",
                            "Your file has been deleted.",
                            "success"
                          );
                    },
                    error: (error) => {
                        console.log(error)
                        alert("Server Error")
                    }
                })
            }
        })
    })

   /// 2nd 
    
    $("#add-btn").click(function(e) {

        if(!subject_code.val() || !subject_name.val() || !subject_units.val() || !subject_year.val() || !subject_sem.val() || courses.val().length <= 0) return alert("Please complete all input")
        
        $.ajax({
            type: "POST",
            url: "/admin/jeffersonpogi",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                code: subject_code.val(),
                s_name: subject_name.val(),
                units: subject_units.val(),
                year: subject_year.val(),
                semester: subject_sem.val(),
                courses: courses.val()
            }),
            success: (res) => {
                if(!res.operation) return alert(res.msg)

                alert(res.msg)

                $("table.list tbody").append(`
                    <tr>
                        <td>${subject_code.val()}</td>
                        <td>${subject_name.val()}</td>
                        <td>${subject_units.val()}</td>
                        <td>${courses.val().join(",")}</td>
                        <td class="actions"><button class="btndel" id="${subject_code.val()}"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>
                `)

                clearInput()
            },
            error: (error) => {
                alert("Something went wrong")
                console.log(error)
            }
        })

    })

})