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
	const info = await getData("./data/informasi-jurusan.json").catch(
		(error) => {
			console.error(error);
		}
	);

	if (info) {
		const { saintek, soshum } = info;

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
		const navSoshum = constructNavItem(
			"Soshum",
			"fa-solid fa-users",
			soshum
		);

		appendElement(constructedRow, main);
		appendElement(navSaintek, navbarNav);
		appendElement(navSoshum, navbarNav);
	} else {
		const dangerAlert = `
			<div class="row mt-5">
				<div class="col mt-5">
					<div class="alert alert-danger fs-3 fw-bold text-center" role="alert">
						<i class="fa-solid fa-circle-exclamation me-2"></i>
						Ada kesalahan ketika mengambil data!
					</div>
				</div>
			</div>
		`;
		appendElement(dangerAlert, main);
	}
};

try {
	main();
} catch (e) {
	console.error(e);
}
