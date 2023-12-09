$(function(e) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    $.ajax({
        type: "GET",
        url: `/admin/getstudentdata?id=${params["uid"]}`,
        success: (res) => {
            if(res.data){
                const { data } = res
                const year = data["Year"].split(" ")
                $("div.first-table,div.second-table,div.third-table,div.fourth-table").html('')

                data.selected_subjects.forEach((subj) => {
                    $("div.first-table,div.second-table,div.fourth-table").append(`
                        <div class="cell">${subj.code} ${subj.subject_name}</div>
                        <div class="cell">${subj.units}</div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    `)

                    $("div.third-table").append(`
                        <div class="cell">${subj.code} ${subj.subject_name}</div>
                        <div class="cell">${subj.units}</div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    `)
                })

                //ADD REMAINING CELLS IN FIRST,SECOND,FOURTH TABLE
                if($("div.first-table div.cell").length <= 78){
                    const remaining = 78 - $("div.first-table div.cell").length
                    for (let i = 0; i < remaining; i++) {
                        $("div.first-table,div.second-table,div.fourth-table").append(`
                            <div class="cell"></div>
                        `)
                    }
                }
                
                //ADD REMAINING CELLS IN THIRD TABLE
                if($("div.third-table div.cell").length <= 60){
                    const remaining = 60 - $("div.third-table div.cell").length
                    for (let i = 0; i < remaining; i++) {
                        $("div.third-table").append(`
                            <div class="cell"></div>
                        `)
                    }
                }

                $(`input[type=checkbox]`).prop("checked", false)
                $(`input[type=checkbox]#${data.Classification}`).prop("checked", true)
                $(`input[id^="${year[0]}"]`).prop("checked", true)
                $(`div.taon input[id^="${year[0]}"]`).val(year[0])
                $("input#sem").val(data["Semester"])
                $("input.course").val(data['Course'])
                $("input.student-number").val(data["Stud_ID"])

                $("input#family,input#lastname,input.lastname").val(data['LastName'])
                $("input#first,input.firstname").val(data['FirstName'])
                $("input#middle,input.middle").val(data['MiddleName'])
                $("input#gender").val(data["Gender"])
                $("input#status").val(data["Status"])
                $("input#tel").val(data["Phone"])
                $("input#nationality").val(data["Nationality"])
                $("input#birthday").val(data["date_of_Birth"])
                $("input#placeofBirth").val(data["Place_of_Birth"])
                $("input#address").val(data["Current_Address"])
                $("input#prov").val(data["Provincial_Address"])
                $("input#religion").val(data["Religion"])
                $("input#email").val(data["Email"])
                $("input#parents").val(data["Parent_or_Guardian"])
                $("input#occupation").val(data["Occupation"])

                $("input#grade6").val(data["sixth_grade_school"])
                $("input#year6").val(data["sixth_grade_year"])
                $("input#grade10").val(data["tenth_grade_school"])
                $("input#year10").val(data["tenth_grade_year"])
                $("input#grade12").val(data["twelve_grade_school"])
                $("input#year12").val(data["twelve_grade_year"])
                $("input#de").val(data["college_school"])
                $("input#deyear").val(data["college_year"])

                window.print()
            }
        },
        error: (error) => {
            console.log(error)
        }
    })

    $(window).on("afterprint", function(e) {
        window.close()
    })
})