let count = document.getElementById("count");
let buttons = document.querySelectorAll(".add-cart");

let num = 0;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    num++;
    count.innerText = num;

    Swal.fire({
      title: "Added!",
      text: "Product added to cart successfully.",
      icon: "success",
      confirmButtonText: "OK"
    });
  });
});