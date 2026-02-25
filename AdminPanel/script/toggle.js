const menuToggle = document.getElementById("menuToggle");
const container = document.querySelector(".container");
const closeSidebar = document.getElementById("closeSidebar");

menuToggle.addEventListener("click", () => {
  container.classList.toggle("hide-sidebar");
});

if (closeSidebar) {
  closeSidebar.addEventListener("click", () => {
    container.classList.remove("hide-sidebar");
  });
}
