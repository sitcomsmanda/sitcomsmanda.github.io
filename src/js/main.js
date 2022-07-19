/**
 *!  Main Search Logics
 */

const hiddenClass = "visually-hidden",
  maxItems = 3,
  loadItems = 3;

const hiddenProjects = (condition = true) => {
  const parent = document.querySelector(".projects"),
    items = parent.querySelectorAll(".project"),
    loadMore = document.querySelector("#loadMore");

  if (condition) {
    items.forEach((item, index) => {
      if (index > maxItems - 1) {
        item.classList.add(hiddenClass);
      }
    });
  }

  loadMore.addEventListener("click", function (e) {
    e.preventDefault();
    [].forEach.call(
      document.querySelectorAll("." + hiddenClass),
      function (item, index) {
        if (index < loadItems) {
          item.classList.remove(hiddenClass);
        }

        if (document.querySelectorAll("." + hiddenClass).length === 0) {
          loadMore.style.display = "none";
        }
      }
    );
  });
};

const body = document.querySelector("body");

body.addEventListener("keyup", function (e) {
  // Define only for the input with search class
  if (e.target.classList.contains("search")) {
    // Select and put it in a variables
    const search = e.target.value.toUpperCase();
    const li = document.querySelectorAll(".project");
    const loadMore = document.querySelector("#loadMore");

    if (search !== "") {
      loadMore.style.display = "none";
    } else {
      loadMore.style.display = "";
      loadMore.innerHTML = "See More";
    }

    if (search === "") {
      li.forEach((item, index) => {
        item.style.display = "";
        if (index > maxItems - 1) {
          item.classList.add(hiddenClass);
        }
        loadMore.style.display = "";
      });
    } else {
      // loop through the list
      let hiddenLi = 0;
      for (let i = 0; i < li.length; i++) {
        li[i].classList.remove("visually-hidden");
        // select the text content
        title = li[i].querySelector(".title");
        sub = li[i].querySelector(".sub-title");
        desc = li[i].querySelector(".desc");
        // Insert all of them
        txtValue = `${title.textContent || title.innerText} ${
          sub.textContent || sub.innerText
        } ${desc.textContent || desc.innerText}`;

        if (txtValue.toUpperCase().indexOf(search) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
          hiddenLi++;
        }
      }
      if (hiddenLi === li.length) {
        loadMore.style.display = "";
        loadMore.innerHTML = "Not Found";
      }
    }
  }
});

/**
 *!  "data/proyek.json" into HTML Logics
 */

// fetch data function
const getData = async (url = "") => {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
  return data;
};

// format to indonesian date function
const formatDate = (dateType = "1995-12-17T03:24:00") => {
  const date = new Date(dateType);
  // list of months in indonesian
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()}`;
};

// display (li element)
const displayProject = (data = {}) => {
  const li = `
        <li class="project">
            <h3 class="title">
                <a href="${data.src}">
                    ${data.title}
                </a>
            </h3>
            <h4 class="sub-title">
                ${data.subTitle} | Oleh ${data.author}
            </h4>
            <p class="desc">${formatDate(data.date)}</p>
        </li>
    `;
  // Parse it into the DOM element and access the body and children 1
  return new DOMParser().parseFromString(li, "text/html").body.children[0];
};

// Main "data/proyek.json" to HTML function
const main = async () => {
  // Get the ul elements
  const projectsContainer = document.querySelector("#projects");

  // Get the projects data in "./data/proyek.json"
  const projectsData = await getData("./data/proyek.json");

  // Map and change it to html (li element)
  const projects = projectsData.map((project) => displayProject(project));

  // Put it in the projects container
  projects.forEach((project) => {
    projectsContainer.append(project);
  });

  hiddenProjects();
};

try {
  main();
} catch (e) {
  console.error(e);
}
