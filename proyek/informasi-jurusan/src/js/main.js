const main = async () => {
	const body = document.querySelector("body");
	const offcanvasNavbar = new bootstrap.Offcanvas("#offcanvasNavbar");

	body.addEventListener("click", function (e) {
		if (e.target.classList.contains("dropdown-item-link")) {
			setTimeout(() => {
				offcanvasNavbar.hide();
			}, 500);
		}
	});

	const main = document.querySelector("#main");
	const navbarNav = document.querySelector(".navbar-nav");

	// Path relative from index.html
	const { saintek, soshum } = await getData("./data/informasi-jurusan.json");

	let constructedRow = ``;

	await saintek.forEach((fakultas) => {
		constructedRow += constructRow(fakultas);
	});

	await soshum.forEach((fakultas) => {
		constructedRow += constructRow(fakultas);
	});

	const navSaintek = constructNavItem(
		"Saintek",
		"fa-solid fa-flask",
		saintek
	);
	const navSoshum = constructNavItem("Soshum", "fa-solid fa-users", soshum);

	appendElement(constructedRow, main);
	appendElement(navSaintek, navbarNav);
	appendElement(navSoshum, navbarNav);
};

try {
	main();
} catch (e) {
	console.error(e);
}
