$(function(e) {
    const fname = $("#firstname")
    const mname = $("#middlename")
    const lname = $("#lastname")
    const s_number = $("#studnumber")
    const course = $("#course")
    const year = $("#year")
    const sem = $("#sem")
    const classy = $("#classification")
    const dob = $("#dob")
    const pob = $("#pob")
    const sex = $("#sex")
    const nationality = $("#nationality")
    const status = $("#status")
    const religion = $("#religion")
    const contact = $("#contact")
    const email = $("#email")
    const address = $("#address")
    const province = $("#province")
    const guardian = $("#guardian")
    const guardian_num = $("#guardian_num")
    const occupation = $("#occupation")

    const six = $("#g6")
    const six_year = $("#g6_year")
    const ten = $("#g10")
    const ten_year = $("#g10_year")
    const twelve = $("#g12")
    const twelve_year = $("#g12_year")
    const degree = $("#degree")
    const deg_year = $("#deg_year")

    const result_fn = $("#Result-fn")
    const result_mi = $("#Result-mi")
    const result_ln = $("#Result-ln")    
    const result_sn = $("#Result-sn")
    const result_cs = $("#Result-cs")
    const result_yr = $("#Result-yr")
    const result_sem = $("#Result-sem")
    const result_cl = $("#Result-cl")
    const result_bd = $("#Result-bd")
    const result_pb = $("#Result-pb")
    const result_sex = $("#Result-sex")
    const result_nt = $("#Result-nt")
    const result_st = $("#Result-st")
    const result_re = $("#Result-re")
    const result_tel = $("#Result-tel")
    const result_em = $("#Result-em")
    const result_ca= $("#Result-ca")
    const result_pa = $("#Result-pa")
    const result_gd = $("#Result-gd")
    const result_gn = $("#Result-gn")
    const result_oc = $("#Result-oc")
    const result_g6 = $("#Result-g6")
    const year_g6 = $("#year-g6")
    const result_g10 = $("#Result-g10")
    const year_10 = $("#year-g10")
    const result_g12 = $("#Result-g12")
    const year_12 = $("#year-g12")
    const result_degree = $("#Result-degree")
    const year_degree = $("#year-degree")
    const selectedSubjects = []

    $("table tbody").on("change", "input[type=checkbox]", function(e) {
        const currentSubject = $(this)
        if(currentSubject.prop("checked") == true){
            selectedSubjects.push(currentSubject.attr("id"))
        }else{
            const toRemoveSubject = selectedSubjects.indexOf(currentSubject.attr("id"))
            selectedSubjects.splice(toRemoveSubject, 1)
        }
        console.log(selectedSubjects)
    })

    $("#course,#year,#sem").change(function(e) {
        if(!course.val() || !year.val() || !sem.val()) return null

        const selectedCourse = course.val()
        const selectedYear = year.val()
        const selectedSem = sem.val()

        $("#course_title").text(`${selectedCourse.replace("_", " ")} Subjects`)
        $("#year_title").text(selectedYear)

        $.ajax({
            type: "GET",
            url: `/student/get_course_subject?selectedCourse=${selectedCourse}&selectedYear=${selectedYear}&selectedSem=${selectedSem}`,
            success: ({ semester_subjects, bridging_subjects }) => {
                $("tbody.semester,tbody.bridging").html(``)

                semester_subjects.forEach((subj) => {
                    $("tbody.semester").append(`
                    <tr>
                        <td>${subj.code}</td>
                        <td>${subj.subject_name}</td>
                        <td>${subj.units}</td>
                        <td><input type="checkbox" id="${subj.code}"></td>
                    </tr>
                    `)
                })

                bridging_subjects.forEach((subj) => {
                    $("tbody.bridging").append(`
                    <tr>
                        <td>${subj.code}</td>
                        <td>${subj.subject_name}</td>
                        <td>${subj.units}</td>
                        <td><input type="checkbox" id="${subj.code}"></td>
                    </tr>
                    `)
                })
            },
            error: (error) => {
                console.log(error)
                alert("Something went wrong")
            }
        })

    })
    
    $("input.final-btn").click(function(e) {
        $.ajax({
            type: "POST",
            url: "/admin/registerform",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                fname: result_fn.text(),
                mname: result_mi.text(),
                lname: result_ln.text(),
                s_number: result_sn.text(),
                course: result_cs.text(),
                year: result_yr.text(),
                sem: result_sem.text(),
                classy: result_cl.text(),
                dob: result_bd.text(),
                pob: result_pb.text(),
                sex: result_sex.text(),
                nationality: result_nt.text(),
                status: result_st.text(),
                religion: result_re.text(),
                contact: result_tel.text(),
                email: result_em.text(),
                address: result_ca.text(),
                province: result_pa.text(),
                guardian: result_gd.text(),
                guardian_num: result_gn.text(),
                occupation: result_oc.text(),
                six: result_g6.text(),
                six_year: year_g6.text(),
                ten: result_g10.text(),
                ten_year: year_10.text(),
                twelve: result_g12.text(),
                twelve_year: year_12.text(),
                degree: result_degree.text(),
                deg_year: year_degree.text(),
                selected_subjects: selectedSubjects
            }),
            success: (res) => {
                Swal.fire({
                    title: res.msg,
                    confirmButtonText: "OK",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.replace("/student/studDashboard")
                    } 
                });
            },
            error: (err) => {
                console.log(err)
            }
        })
    })
   
    $("input.btn2").click(function(e){

        result_g6.text(six.val())
        year_g6.text(six_year.val())
        result_g10.text(ten.val())
        year_10.text(ten_year.val())
        result_g12.text(twelve.val())
        year_12.text(twelve_year.val())
        result_degree.text(degree.val())
        year_degree.text(deg_year.val())

    })

    $(".btn1").click(function(e) {

        result_fn.text(fname.val())
        result_mi.text(mname.val())
        result_ln.text(lname.val())
        result_sn.text(s_number.val())
        result_cs.text(course.val())
        result_yr.text(year.val())
        result_sem.text(sem.val())
        result_cl.text(classy.val())
        result_bd.text(dob.val())
        result_pb.text(pob.val())
        result_sex.text(sex.val())
        result_nt.text(nationality.val())
        result_st.text(status.val())
        result_re.text(religion.val())
        result_tel.text(contact.val())
        result_em.text(email.val())
        result_ca.text(address.val())
        result_pa.text(province.val())
        result_gd.text(guardian.val())
        result_gn.text(guardian_num.val())
        result_oc.text(occupation.val())
        
    })

     // Initial setup
     $(".form-step:not(:first)").hide();

     // Next button click handler
     $(".send-btn").click(function () {
         var currentStep = $(this).closest(".form-step");
         var nextStep = currentStep.next(".form-step");
         var prevStep = currentStep.prev(".form-step");

         if ($(this).val() === "Next" && validateInputs(currentStep)) {
            if(currentStep.find("div.subjects").length >= 1){
                if(selectedSubjects.length <= 0) {
                    alert("Please select a subject")
                    return null
                }
             }
             currentStep.hide();
             nextStep.show();
         } else if ($(this).val() === "Previous" && prevStep.length > 0) {
             currentStep.hide();
             prevStep.show();
         }
     });

     // Function to validate inputs in a step
     function validateInputs(step) {
         var inputs = step.find("input[required]");
         var isValid = true;

         inputs.each(function () {
             if ($(this).val().trim() === "") {
                 isValid = false;
                 return false; // Exit the loop early if an empty input is found
             }
         });

         if (!isValid) {
             // You can add a validation message or alert here if needed
             alert("Please fill in all required fields.");
         }

         return isValid;
     }
})