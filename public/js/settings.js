$(function(e) {
    const fullname = $("#name")
    const email = $("#email")
    const pass = $("#password")
    const addBtn = $("#add-btn")

    function clearInput() {
        fullname.val("")
        email.val("")
        pass.val("")
    }

    function fetchData() {
        $.ajax({
            type: "GET",
            url: "/getAccounts",
            success: (res) => {
                if(res.operation){
                    $("tbody.tblbody").html("")
                    
                    if(res.accounts.length >= 1){
                        res.accounts.forEach((acc) => {
                            $("tbody.tblbody").append(`
                            <tr>
                                <td>${acc.fullname}</td>
                                <td>${acc.email}</td>
                                <td class="actions">
                                    <button class="btndel" id="${acc.email}"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        `)
                        })
    
                        return null
                    }
    
                    $("tbody.tblbody").append(`<tr><td colspan="3"><h1>NO DATA TO DISPLAY</h1></td></tr>`)
    
                }
            }
        })
    }

    fetchData()


    addBtn.click(function(e) {
        if(!fullname.val() || !email.val() || !pass.val()) return alert("Please complete all inputs")

        $.ajax({
            type: "POST",
            url: "/addAccount",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                email: email.val(),
                fullname: fullname.val(),
                password: pass.val()
            }),
            success: (res) => {
                if(res.operation){
                    fetchData()
                    clearInput()
                    return alert("Account added")
                }
                alert(res.msg)
            }
        })
    })


    $("tbody.tblbody").on("click", "button.btndel", function(e) {
        const email = $(this).attr("id")
        $.ajax({
            type: "DELETE",
            url: `/deleteAccount?email=${email}`,
            success: (res) => {
                if(res.operation){
                    fetchData()
                    alert("Account deleted")
                }
            }
        })
    })

})