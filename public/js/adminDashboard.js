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
        } 
      });
  });

  //2nd step

  $("tbody#hehe").on("click", "button#accept", function (e) {
    const id = $(this).attr("data-id");
    const current = $(this);

    $.ajax({
      type: "POST",
      url: `/admin/postRequest?id=${id}`,
      success: (res) => {
        if(!res.operation) return alert("Something went wrong")

        current.closest("tr").remove();
        $("span#request-label").text(res.numberOfRequests);
        $("span#account-label").text(res.numberofAccounts);
        if (res.numberOfRequests <= 0) {
          $("tbody").html(`
            <tr>
                <td colspan="8"><h1 style="text-align: center;">NO DATA TO DISPLAY</h1></td>
            </tr>
          `);
        }

        Swal.fire({
          icon: 'success',
          title: 'Student Request Accepted'
        })
      },
      error: (error) => {
        alert("Server Error")
        console.log(error)
      }
    })
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
