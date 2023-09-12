// $(function () {
//     $("tbody#hehe").on("click", "button#reject", function(e) {
 
//         const id = $(this).attr("data-id")
//         const current = $(this)
//         $.ajax({
//             type: "DELETE",
//             url: `/admin/deleteRequest?id=${id}`,
//             success: (res) => {
//                 if(!res.operation) return alert("THERE IS AN ERROR")

//                 current.closest("tr").remove()
//                 $("span#request-label").text(res.numberOfRequests)

//                 if(res.numberOfRequests <= 0) {
//                   $("tbody").html(`
//                   <tr>
//                       <td colspan="8"><h1 style="text-align: center;">NO DATA TO DISPLAY</h1></td>
//                   </tr>
//                   `)
//                 }
//             },
//             error: (error) => {
//                 alert("Something went wrong")
//                 console.log(error)
//             }
//         })
//     })

//     $("tbody#hehe").on("click", "button#accept", function(e) {
 
//         const id = $(this).attr("data-id")
//         const current = $(this)

//         alert(id)
//     })
// })
$(function () {
  $("tbody#hehe").on("click", "button#reject", function (e) {
    const id = $(this).attr("data-id");
    const current = $(this);

    // Display SweetAlert2 warning before performing the deletion
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
          // User confirmed the deletion, send the DELETE request
          $.ajax({
            type: "DELETE",
            url: `/admin/deleteRequest?id=${id}`,
            success: (res) => {
              if (!res.operation) return alert("THERE IS AN ERROR");

              current.closest("tr").remove();
              $("span#request-label").text(res.numberOfRequests);

              if (res.numberOfRequests <= 0) {
                $("tbody").html(`
                  <tr>
                      <td colspan="8"><h1 style="text-align: center;">NO DATA TO DISPLAY</h1></td>
                  </tr>
                `);
              }

              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
            },
            error: (error) => {
              alert("Something went wrong");
              console.log(error);
            },
          });
        } else if (
          /* User clicked the "Cancel" button */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Student Request is safe :)",
            "error"
          );
        }
      });
  });

  $("tbody#hehe").on("click", "button#accept", function (e) {
    const id = $(this).attr("data-id");
    const current = $(this);

    alert(id);
  });
});


function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("studentInfo");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
