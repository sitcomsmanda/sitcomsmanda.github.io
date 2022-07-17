const body = document.querySelector("body");
const buttonCover = document.querySelector(".button-cover");
const knobsSpan = document.querySelector(".button .knobs span");
let toggleKnobs = false;

body.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbox")) {
    body.classList.toggle("dark");
    buttonCover.classList.toggle("dark");
    // if (toggleKnobs) {
    //   knobsSpan.innerHTML = `<i class="fa-solid fa-person-running"></i>`;
    //   toggleKnobs = false;
    // } else {
    //   knobsSpan.innerHTML = `<i class="fa-solid fa-bed"></i>`;
    //   toggleKnobs = true;
    // }
  }
});
