$(function(e) {
    $("button#finish").click(function(e) {
        Swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "PUT",
            url: "/admin/nextyear",
            success: (res) => {
                if(res.operation){
                    location.reload()
                } 
            },
            error: (error) => {
                console.log(error)
            }
          })
        } 
      });
    })
})