// signup function
let form = document.querySelector(".form-new");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    signupForm();
  });
}

// let regList = []
let regList = JSON.parse(localStorage.getItem("regList")) || [];

let signupForm = () => {
  //getting input value
  let uname = document.getElementById("uname");
  let email = document.getElementById("email");
  let phnum = document.getElementById("phnum");
  let password = document.getElementById("password");
  let cnfrmpass = document.getElementById("cnfrmpass");

  //getting span id
  let unameErr = document.getElementById("unameErr");
  let emailErr = document.getElementById("emailErr");
  let phnumErr = document.getElementById("phnumErr");
  let passwordErr = document.getElementById("passwordErr");
  let cnfrmpassErr = document.getElementById("cnfrmpassErr");

  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  //error validations
  let isCheck = true;

  if (uname.value === "") {
    unameErr.innerText = "Please fill out this field !";
    uname.style.border = "2px solid red";
    isCheck = false;
  } else if (!nameRegex.test(uname.value)) {
    unameErr.innerText = "Should contain only alphabets!";
    uname.style.border = "2px solid red";
    isCheck = false;
  } else if (uname.value.length < 3) {
    unameErr.innerText = "Must be at least 3 letters!";
    uname.style.border = "2px solid red";
    isCheck = false;
  } else {
    unameErr.innerText = "";
    uname.style.border = "";
  }

  if (email.value === "") {
    emailErr.innerText = "Please fill out this field !";
    email.style.border = "2px solid red";
    isCheck = false;
  } else if (!emailPattern.test(email.value)) {
    emailErr.innerText = "Enter a valid email address!";
    email.style.border = "2px solid red";
    isCheck = false;
  } else {
    emailErr.innerText = "";
    email.style.border = "";
  }

  if (phnum.value === "") {
    phnumErr.innerText = "Please fill out this field !";
    phnum.style.border = "2px solid red";
    isCheck = false;
  } else if (!/^[6789]\d{9}$/.test(phnum.value)) {
    phnumErr.innerText = "Must be 10 digits and start with 6, 7, 8, or 9!";
    phnum.style.border = "2px solid red";
    isCheck = false;
  } else {
    phnumErr.innerText = "";
    phnum.style.border = "";
  }

  if (password.value === "") {
    passwordErr.innerText = "Please fill out this field !";
    password.style.border = "2px solid red";
    isCheck = false;
  } else if (password.value.length < 8) {
    passwordErr.innerText = "Password requires at least 8 characters !";
    password.style.border = "2px solid red";
    isCheck = false;
  } else {
    passwordErr.innerText = "";
    password.style.border = "";
  }

  if (cnfrmpass.value === "") {
    cnfrmpassErr.innerText = "Please fill out this field !";
    cnfrmpass.style.border = "2px solid red";
    isCheck = false;
  } else if (cnfrmpass.value.length < 8) {
    cnfrmpassErr.innerText = "Password requires at least 8 characters !";
    cnfrmpass.style.border = "2px solid red";
    isCheck = false;
  } else if (cnfrmpass.value !== password.value) {
    cnfrmpassErr.innerText = "Mismatched Password !";
    cnfrmpass.style.border = "2px solid red";
    password.style.border = "2px solid red";
    isCheck = false;
  } else {
    cnfrmpassErr.innerText = "";
    cnfrmpass.style.border = "";
  }

  if (isCheck) {
    let alreadyUser = regList.filter((user) => user.email === email.value);

    if (alreadyUser.length > 0) {
      emailErr.innerText = "Email already registered!";
      email.style.border = "2px solid red";
      return; // stop signup
    }

    // object
    let regData = {
      uname: uname.value,
      email: email.value,
      phnum: phnum.value,
      password: password.value,
      cnfrmpass: cnfrmpass.value,
    };
    //push object to array
    regList.push(regData);

    //store array to local storage
    localStorage.setItem("regList", JSON.stringify(regList));

    loadData();

    //redirecting to signin page

    Swal.fire({
      title: "Success!",
      text: "Registered Successfully!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "../index.html";
    });
  }
};

let loadData = () => {
  //get tbody id
  let tbody = document.getElementById("userReg");

  //get array from local storage
  if (!tbody) return; // stop if table not found

  let regList = JSON.parse(localStorage.getItem("regList")) || [];

  // console.log(regList)

  let tr = "";

  //using forEach()
  regList.forEach((ele, index) => {
    tr += `<tr>
                    <td>${index + 1}</td>
                    <td>${ele.uname}</td>
                    <td>${ele.email}</td>
                    <td>${ele.phnum}</td>
                    <td>${"x".repeat(ele.password.length)}</td>
                    <td>${"x".repeat(ele.cnfrmpass.length)}</td>

                </tr>`;
  });

  // console.log(tr)

  tbody.innerHTML = tr;
};

loadData();
