$(function () {
    $("tbody#hehe").on("click", "button#reject", function(e) {
 
        const id = $(this).attr("data-id")
        const current = $(this)
        $.ajax({
            type: "DELETE",
            url: `/admin/deleteRequest?id=${id}`,
            success: (res) => {
                if(!res.operation) return alert("THERE IS AN ERROR")

                current.closest("tr").remove()
                $("span#request-label").text(res.numberOfRequests)
            },
            error: (error) => {
                alert("Something went wrong")
                console.log(error)
            }
        })
    })

    $("tbody#hehe").on("click", "button#accept", function(e) {
 
        const id = $(this).attr("data-id")
        const current = $(this)

        alert(id)
    })
})