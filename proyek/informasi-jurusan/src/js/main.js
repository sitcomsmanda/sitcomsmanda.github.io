const main = async () => {
	const main = document.querySelector("#main");

	// Path relative from index.html
	const { saintek, soshum } = await getData("./data/informasi-jurusan.json");

	let constructedRow = ``;

	await saintek.forEach((jurusan) => {
		constructedRow += constructRow(jurusan);
	});

	const rowsCollection = new DOMParser().parseFromString(
		constructedRow,
		"text/html"
	).body.children;

	for (let i = 0; i < rowsCollection.length; i++) {
		main.append(rowsCollection.item(i));
	}
};

try {
	main();
} catch (e) {
	console.error(e);
}
