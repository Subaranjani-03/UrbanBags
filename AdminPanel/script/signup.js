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

// let exisited = JSON.parse(localStorage.getItem("regList"))
//     if(exisited == 0){
//       regList = []
//     }else{
//       regList = exisited
//     }

let signupForm = () => {
  // debugger
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

  //error validations
  let isCheck = true;

  if (uname.value === "") {
    unameErr.innerText = "Must Fill This Field !";
    uname.style.border = "2px solid red";
    isCheck = false;
  } else {
    unameErr.innerText = "";
    uname.style.border = "";
  }

  if (email.value === "") {
    emailErr.innerText = "Must Fill This Field !";
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
    phnumErr.innerText = "Must Fill This Field !";
    phnum.style.border = "2px solid red";
    isCheck = false;
  } else if (!/^[6-9]\d{9}$/.test(phnum.value)) {
    phnumErr.innerText = "Enter valid 10 digit phone number";
    phnum.style.border = "2px solid red";
    isCheck = false;
  } else {
    phnumErr.innerText = "";
    phnum.style.border = "";
  }

  if (password.value === "") {
    passwordErr.innerText = "Must Fill This Field !";
    password.style.border = "2px solid red";
    isCheck = false;
  } else if (password.value.length < 8) {
    passwordErr.innerText = "Minimum 8 Characters !";
    password.style.border = "2px solid red";
    isCheck = false;
  } else if (password.value !== cnfrmpass.value) {
    passwordErr.innerText = "Mismatched Password !";
    password.style.border = "2px solid red";
    isCheck = false;
  } else {
    passwordErr.innerText = "";
    password.style.border = "";
  }

  if (cnfrmpass.value === "") {
    cnfrmpassErr.innerText = "Must Fill This Field !";
    cnfrmpass.style.border = "2px solid red";
    isCheck = false;
  } else if (cnfrmpass.value.length < 8) {
    cnfrmpassErr.innerText = "Minimum 8 Characters !";
    cnfrmpass.style.border = "2px solid red";
    isCheck = false;
  } else if (cnfrmpass.value !== password.value) {
    cnfrmpassErr.innerText = "Mismatched Password !";
    passwordErr.innerText = "Mismatched Password !";
    cnfrmpass.style.border = "2px solid red";
    password.style.border = "2px solid red";
    isCheck = false;
  } else {
    cnfrmpassErr.innerText = "";
    cnfrmpass.style.border = "";
  }

  if (isCheck) {
   let alreadyUser = regList.filter(user =>
    user.email === email.value
  );

  if (alreadyUser.length > 0) {
    emailErr.innerText = "Email already registered!";
    email.style.border = "2px solid red";
    return;   // stop signup
  }
    // alert('Registered Successfully!')

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
    // window.location.href = 'signin.html'
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
