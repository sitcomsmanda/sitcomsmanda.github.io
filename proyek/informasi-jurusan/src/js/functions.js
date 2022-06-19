// ! MAIN ROW FUNCTIONS
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
			<div class="accordion-item col-lg-12">
				<h2
					class="accordion-header"
					id="flush-${jurusan.kode}-header"
				>
					<button
						class="accordion-button collapsed fw-semibold"
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
						<div class="container">
							<div class="row justify-content-center">
								<div class="col-lg-6 pt-3 ps-4 shadow-sm border rounded-1">
									<h5>Mempelajari</h5>
									<ul>
										${constructListItem(jurusan.mempelajari)}
									</ul>
								</div>
								<div class="col-lg-6 pt-3 ps-4 shadow-sm border border-white rounded-1 text-bg-primary">
									<h5>Prospek Kerja</h5>
									<ul>
										${constructListItem(jurusan.pekerjaan)}
									</ul>
								</div>
							</div>
						</div>
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
