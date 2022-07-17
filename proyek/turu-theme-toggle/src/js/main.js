const body = document.querySelector("body");
const buttonCover = document.querySelector(".button-cover");
const header = document.querySelector(".header");
let toggleKnobs = false;

body.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbox")) {
    body.classList.toggle("dark");
    buttonCover.classList.toggle("dark");
    header.classList.toggle("dark");
    if (toggleKnobs) {
      header.innerHTML = "Bangun";
      toggleKnobs = false;
    } else {
      header.innerHTML = "Turu";
      toggleKnobs = true;
    }
  }
});
