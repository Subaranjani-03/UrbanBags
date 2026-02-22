function logOut(){
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {

      // Remove login session
      // localStorage.removeItem("loggedUser");
      // localStorage.removeItem("isLoggedIn");


      Swal.fire({
        title: "Logging out...",
        text: "Please wait",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }
  });
};
