// signin function

//preventDefault()        
        let submit_btn = document.querySelector('form')

              submit_btn.addEventListener('submit',(e) =>{
                e.preventDefault()
                loginForm()
              })


      let loginForm = () => {
        // debugger
        //getting input value
        let email = document.getElementById("email")
        let password = document.getElementById("password")
        

        //getting span id
        let emailErr = document.getElementById("emailErr");
        let passwordErr = document.getElementById("passwordErr");
      

        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        //error validations
        let isCheck = true

        if (email.value === "") {
          emailErr.innerText = "Must Fill This Field !";
          email.style.border = '2px solid red'
          isCheck = false
        } 
        else if(!emailPattern.test(email.value)){
          emailErr.innerText = "Enter a valid email address!";
          email.style.border = "2px solid red";
          isCheck = false;
        }else {
          emailErr.innerText = "";
          email.style.border = ''
        }

        if (password.value === "") {
          passwordErr.innerText = "Must Fill This Field !";
          password.style.border = '2px solid red'
          isCheck = false
        } else if(password.value.length < 8){
          passwordErr.innerText = "Minimum 8 Characters !";
          password.style.border = '2px solid red'
          isCheck = false
        } else {
          passwordErr.innerText = "";
          password.style.border = ''
        }

        // if (isCheck){
        //   // alert('Logged In Successfully!')

        // Swal.fire({
        //     icon: "success",
        //     title: "Login Successful",
        //     timer: 1500,
        //     showConfirmButton: false
        // });

        // setTimeout(() => {
        //     window.location.href = 'index.html'
        // }, 1500);
        
        // }

        //preventDefault()        
        // let submit_btn = document.querySelector('form')

        //       submit_btn.addEventListener('submit',(e) =>{
        //         e.preventDefault()
        //       })


        if (isCheck) {

  let regList = JSON.parse(localStorage.getItem("regList")) || [];

  // filter matching users
  let validUser = regList.filter(user =>
    user.email === email.value &&
    user.password === password.value
  );

  if (validUser.length > 0) {

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      timer: 1500,
      showConfirmButton: false
    });

    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1500);

  } else {

    Swal.fire({
      icon: "error",
      title: "Invalid Email or Password",
    });

  }
}

      };
