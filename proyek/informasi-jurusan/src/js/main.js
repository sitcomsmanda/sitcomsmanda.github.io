const main = async () => {
	const main = document.querySelector("#main");

	// Path relative from index.html
	const { saintek, soshum } = await getData("./data/informasi-jurusan.json");

	let constructedRow = ``;

	saintek.forEach((jurusan) => {
		constructedRow += constructRow(jurusan);
	});

	console.dir(constructedRow);
};

const constructRow = (data) => {
	return `
		<div class="row" id="${data.kode}">
			${constructRowHeading(data)}
			${constructRowBody(data)}
		</div>
	`;
};

const constructRowHeading = (data) => {
	return `
		<div class="col-12 mb-3">
			<h2 class="d-flex">
				<div style="width: 30px" class="text-center me-4">
					<i class="${data.faIcon}"></i>
				</div>
				${data.nama}
			</h2>
		</div>
	`;
};

const constructRowBody = (data) => {
	return `
		<div class="col-12 mb-3">
			<div
				class="accordion accordion-flush row"
				id="accordion-${data.kode}"
			>
				${constructAccordionItem(data)}
			</div>
		</div>
	`;
};

const constructAccordionItem = (data) => {
	let items = ``;
	data.jurusan.forEach((jurusan) => {
		items += `
			<div class="accordion-item col-lg-4">
				<h2
					class="accordion-header"
					id="flush-${jurusan.kode}-header"
				>
					<button
						class="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#flush-${jurusan.kode}"
						aria-expanded="false"
						aria-controls="flush-${jurusan.kode}"
					>
						${jurusan.nama}
					</button>
				</h2>
				<div
					id="flush-${jurusan.kode}"
					class="accordion-collapse collapse"
					aria-labelledby="flush-${jurusan.kode}-header"
					data-bs-parent="#accordion-${data.kode}"
				>
					<div class="accordion-body">
						<p>
							${jurusan.deskripsi}
						</p>
						<ul class="list-group">
							<li class="list-group-item">
								<h5>Mempelajari</h5>
								<ul>
									${constructListItem(jurusan.mempelajari)}
								</ul>
							</li>
							<li class="list-group-item">
								<h5>Prospek Kerja</h5>
								<ul>
									${constructListItem(jurusan.pekerjaan)}
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		`;
	});
	return items;
};

const constructListItem = (data) => {
	let lists = ``;
	data.forEach((item) => {
		lists += `
			<li>
				${item}
			</li>
		`;
	});
	return lists;
};

// fetch data function
const getData = async (url = "") => {
	const data = await fetch(url)
		.then((response) => response.json())
		.then((data) => data);
	return data;
};

try {
	main();
} catch (e) {
	console.error(e);
}
