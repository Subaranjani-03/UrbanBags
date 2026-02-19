// admin login function

//preventDefault()
let submit_btn = document.querySelector("form");

submit_btn.addEventListener("submit", (e) => {
  e.preventDefault();
  adminLogin();
});

let adminLogin = () => {
  //getting input value
  let uname = document.getElementById("uname");
  let password = document.getElementById("password");

  //getting span id
  let unameErr = document.getElementById("unameErr");
  let passwordErr = document.getElementById("passwordErr");

  //error validations
  let isCheck = true;

  if (uname.value === "") {
    unameErr.innerText = "Please fill out this field !";
    uname.style.border = "2px solid red";
    isCheck = false;
  } else if (uname.value !== "admin") {
    unameErr.innerText = "Invalid User Name";
    uname.style.border = "2px solid red";
    isCheck = false;
  } else {
    unameErr.innerText = "";
    uname.style.border = "";
  }

  if (password.value === "") {
    passwordErr.innerText = "Please fill out this field !";
    password.style.border = "2px solid red";
    isCheck = false;
  } else if (password.value !== "admin12") {
    passwordErr.innerText = "Incorrect Password";
    password.style.border = "2px solid red";
    isCheck = false;
  } else {
    passwordErr.innerText = "";
    password.style.border = "";
  }

  if (isCheck) {
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  }
};
