$(document).ready(function(){

    document.getElementById("myInput").addEventListener("keyup", function() {
    var filter, table, tr, td, i, txtValue;
    filter = this.value.toUpperCase();
    table = document.getElementById("studentInfo");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // Change index to the column you want to search
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    });

    $("td.action-table").on("click", "button#view", function(){
        const id = $(this).attr("data-id")
        
        $.ajax({
            type: "GET",
            url: `/admin/get_student_subj_list_and_selected?id=${id}`,
            success: ({ student, account, sem_subjects, bridging_subjects, completeInfoSubject }) => {

                if(!student) return alert("No active enrolment form")
                $("div.stud-course p,div.stud-name p").html(``)
                $("div.for-popup tbody").html(``)

                $("img#profile").prop("src", account.image)
                $("#fullname").html(`<strong>Name:</strong> ${account.fullname}`)
                
                if(student){
                    $("button#finish").attr("student-id", student.uid)
                    $("p#s_number").html(`<strong>Student Number:</strong> ${student["Stud_ID"]}`)
                    $("#course").html(`<strong>Course:</strong> ${student.Course}`)
                    $("#year_level").html(`<strong>Year:</strong> ${student.Year}`)
                    $("#sem").html(`<strong>Semester:</strong> ${student.Semester}`)
                    $("#addr").html(`<strong>Address:</strong> ${student.Current_Address}`)
                    completeInfoSubject.forEach((subj) => {
                        $("tbody.enrolled-tbody").append(`
                            <tr id="subject">
                                <td id="code">${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button id="drop" data-student="${student.uid}" data-id="${subj.code}"><i class="fa-solid fa-circle-minus"></i></button></td>
                            </tr>
                        `)
                    })

                    const firstyearfirstsem = sem_subjects.filter((subj) => {
                        return subj.semester == "1st" && subj.year_level == "1st Year"
                    })
                    const firstyearsecondsem = sem_subjects.filter((subj) => {
                        return subj.semester == "2nd" && subj.year_level == "1st Year"
                    })
    
                    const secondyearfirstsem = sem_subjects.filter((subj) => {
                        return subj.semester == "1st" && subj.year_level == "2nd Year"
                    })
                    const secondyearsecondsem = sem_subjects.filter((subj) => {
                        return subj.semester == "2nd" && subj.year_level == "2nd Year"
                    })
    
                    const thirdyearfirstsem = sem_subjects.filter((subj) => {
                        return subj.semester == "1st" && subj.year_level == "3rd Year"
                    })
                    const thirdyearsecondsem = sem_subjects.filter((subj) => {
                        return subj.semester == "2nd" && subj.year_level == "3rd Year"
                    })
    
                    const fourthyearfirstsem = sem_subjects.filter((subj) => {
                        return subj.semester == "1st" && subj.year_level == "4th Year"
                    })
                    const fourthyearsecondsem = sem_subjects.filter((subj) => {
                        return subj.semester == "2nd" && subj.year_level == "4th Year"
                    })
    
                    firstyearfirstsem.forEach((subj) => {
                        $("tbody.1tbodyfirst").append(`
                            <tr>
                                <td>${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button type="button" data-action="add" student-id="${student.id}" data-student="${student.uid}" id="${subj.code}"><i class="fa-solid fa-circle-plus"></i></button></td>
                            </tr>
                        `)
                    })

                    firstyearsecondsem.forEach((subj) => {
                        $("tbody.1tbodysecond").append(`
                            <tr>
                                <td>${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button type="button" data-action="add" student-id="${student.id}" data-student="${student.uid}" id="${subj.code}"><i class="fa-solid fa-circle-plus"></i></button></td>
                            </tr>
                        `)
                    })

                    secondyearfirstsem.forEach((subj) => {
                        $("tbody.2tbodyfirst").append(`
                            <tr>
                                <td>${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button type="button" data-action="add" student-id="${student.id}" data-student="${student.uid}" id="${subj.code}"><i class="fa-solid fa-circle-plus"></i></button></td>
                            </tr>
                        `)
                    })

                    secondyearsecondsem.forEach((subj) => {
                        $("tbody.2tbodysecond").append(`
                            <tr>
                                <td>${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button type="button" data-action="add" student-id="${student.id}" data-student="${student.uid}" id="${subj.code}"><i class="fa-solid fa-circle-plus"></i></button></td>
                            </tr>
                        `)
                    })

                    thirdyearfirstsem.forEach((subj) => {
                        $("tbody.3tbodyfirst").append(`
                            <tr>
                                <td>${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button type="button" data-action="add" student-id="${student.id}" data-student="${student.uid}" id="${subj.code}"><i class="fa-solid fa-circle-plus"></i></button></td>
                            </tr>
                        `)
                    })

                    thirdyearsecondsem.forEach((subj) => {
                        $("tbody.3tbodysecond").append(`
                            <tr>
                                <td>${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button type="button" data-action="add" student-id="${student.id}" data-student="${student.uid}" id="${subj.code}"><i class="fa-solid fa-circle-plus"></i></button></td>
                            </tr>
                        `)
                    })

                    fourthyearfirstsem.forEach((subj) => {
                        $("tbody.4tbodyfirst").append(`
                            <tr>
                                <td>${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button type="button" data-action="add" student-id="${student.id}" data-student="${student.uid}" id="${subj.code}"><i class="fa-solid fa-circle-plus"></i></button></td>
                            </tr>
                        `)
                    })

                    fourthyearsecondsem.forEach((subj) => {
                        $("tbody.4tbodysecond").append(`
                            <tr>
                                <td>${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button type="button" data-action="add" student-id="${student.id}" data-student="${student.uid}" id="${subj.code}"><i class="fa-solid fa-circle-plus"></i></button></td>
                            </tr>
                        `)
                    })

                    bridging_subjects.forEach((subj) => {
                        $("tbody.bridging").append(`
                            <tr>
                                <td>${subj.code}</td>
                                <td>${subj.subject_name}</td>
                                <td>${subj.units}</td>
                                <td><button type="button" data-action="add" student-id="${student.id}" data-student="${student.uid}" id="${subj.code}"><i class="fa-solid fa-circle-plus"></i></button></td>
                            </tr>
                        `)
                    })

                }

                $("#popupForm").fadeToggle();

            },
            error: (err) => {
                console.log(err)
                alert("Something went wrong")
            }
        })
        
    });

    $("button#finish").click(function(e) {
        const current = $(this)
        const subjects = $("tbody.enrolled-tbody tr td#code")
        const tobepassed = []
        subjects.each(function(i) {
            tobepassed.push($(this).text())
        })
        $.ajax({
            type: "PATCH",
            url: `/admin/pass_subject?codes=${JSON.stringify(tobepassed)}&id=${current.attr("student-id")}`,
            success: (res) => {
                if(res.operation){
                    $("tbody.enrolled-tbody").html(``)
                }
            },
            error: (err) => {
                console.log(err)
            }
        })
    })

    $("tbody").on("click", "button[data-action=add]", function(e) {
        const current = $(this)

        const check = $("tbody.enrolled-tbody tr td#code")

        let checker = false

        check.each(function(i) {
            if($(this).text() == current.attr("id")) checker = true
        })

        if(checker) return alert("Subject already added")

        $.ajax({
            type: "PATCH",
            url: `/admin/add_student_subject?code=${current.attr("id")}&uid=${current.attr("data-student")}&id=${current.attr("student-id")}`,
            success: (res) => {
                if(res.operation){
                    $("tbody.enrolled-tbody").append(`
                        <tr id="subject">
                            <td id="code">${res.subj.code}</td>
                            <td>${res.subj.subject_name}</td>
                            <td>${res.subj.units}</td>
                            <td><button id="drop" data-student="${current.attr("data-student")}" data-id="${res.subj.code}"><i class="fa-solid fa-circle-minus"></i></button></td>
                        </tr>
                    `)
                    alert("Subject added")
                }

                if(res.msg) alert(res.msg)
            },
            error: (err) => {
                console.log(err)
            }
        })
    })

    $("tbody").on("click", "button#drop", function(e){
        const current = $(this)
        $.ajax({
            type: "PATCH",
            url: `/admin/drop_subject?code=${current.attr("data-id")}&id=${current.attr("data-student")}`,
            success: (res) => {
                if(res.operation){
                    current.closest("tr").remove()
                }
            },
            error: (err) => {
                console.log(err)
            }
        })
    })
        
    $("#back").click(function() {
        $("#popupForm").fadeOut("slow");
    })

    $("td.action-table").on("click", "button#remove", function(){
        const current = $(this)

        Swal.fire({
        title: "Do you want to delete?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: `No`
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
            type: "DELETE",
            url: `/admin/deleteAccount?account_id=${current.attr("data-id")}`,
            success: (res) => {
                if(res.operation){
                    current.closest("tr").remove()
                }
            },
            error: (err) => {
                console.log(err)
            }
        })
        }
        });
    });
  

 
});