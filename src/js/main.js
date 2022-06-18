/**
 *!  Main Search Logics
 */

const body = document.querySelector("body");

body.addEventListener("keyup", function (e) {
	// Define only for the input with search class
	if (e.target.classList.contains("search")) {
		// Select and put it in a variables
		const search = e.target.value.toUpperCase();
		const li = document.querySelectorAll(".project");

		// loop through the list
		for (let i = 0; i < li.length; i++) {
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
			}
		}

		// Remove the value if user press Escape
		if (e.code === "Escape") {
			e.target.value = "";
			li.forEach((x) => (x.style.display = ""));
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
            <p class="desc">${new Date(data.date).getDate()}</p>
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
};

try {
	main();
} catch (e) {
	console.error(e);
}
