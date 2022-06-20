const main = async () => {
	const body = document.querySelector("body");
	const offcanvasNavbar = new bootstrap.Offcanvas("#offcanvasNavbar");

	body.addEventListener("click", function (e) {
		if (e.target.classList.contains("dropdown-item-link")) {
			offcanvasNavbar.hide();
		}
	});

	const main = document.querySelector("#main");
	const navbarNav = document.querySelector(".navbar-nav");

	// Path relative from index.html
	const { saintek, soshum } = await getData("./data/informasi-jurusan.json");

	let constructedRow = ``;
	await saintek.forEach((jurusan) => {
		constructedRow += constructRow(jurusan);
	});
	appendElement(constructedRow, main);

	const navSaintek = constructNavItem(
		"Saintek",
		"fa-solid fa-flask",
		saintek
	);
	appendElement(navSaintek, navbarNav);

	const navSoshum = constructNavItem("Soshum", "fa-solid fa-users", soshum);
	appendElement(navSoshum, navbarNav);
};

try {
	main();
} catch (e) {
	console.error(e);
}
