const menuToggle = document.getElementById("menuToggle");
const container = document.querySelector(".container");

menuToggle.addEventListener("click", function () {
  container.classList.toggle("hide-sidebar");
});

