const main = async () => {
	const main = document.querySelector("#main");

	// Path relative from index.html
	const { saintek, soshum } = await getData("./data/informasi-jurusan.json");

	let constructedRow = ``;

	await saintek.forEach((jurusan) => {
		constructedRow += constructRow(jurusan);
	});

	appendElement(constructedRow, main);

	const nav = constructNavItem("Saintek", "fa-solid fa-flask", saintek);

	console.log(nav);
};

try {
	main();
} catch (e) {
	console.error(e);
}
