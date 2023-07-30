import { getBirdOTDDetails, conservationStatuses } from "./birds.js";

export function getMainPageHTML() {
  return `<div id="welcome-page">
		<header>
			<img src="./icon.svg" alt="Birds of Aotearoa Kiwi Logo" />
			<h1>Birds of Aotearoa</h1>
		</header>
		<main class="main-page">
			<section>
			<div class="section-header">
				<h3>Bird of the day</h3>
				<hr />
			</div>
			${getBirdOTDHTML()}
			</section>
		</main>
	</div>
	`;
}
export function getBirdOTDHTML() {
  const birdOTDDetails = getBirdOTDDetails();
  return `<div class="container botd-container">
		<div class="botd-bird-info">
			<h4>${birdOTDDetails.primary_name}</h4>
			<h5>${birdOTDDetails.english_name}</h5>
			<div class="botd-bird-extra-info">
				<div><span class="botd-info-label">Scientific name:</span> <span class="botd-info-value">${
          birdOTDDetails.scientific_name
        }</span></div>
				<div><span class="botd-info-label">Family:</span> <span class="botd-info-value">${
          birdOTDDetails.family
        }</span></div>
				<div><span class="botd-info-label">Order:</span> <span class="botd-info-value">${
          birdOTDDetails.order
        }</span></div>
				<div><span class="botd-info-label">Length:</span> <span class="botd-info-value">${
          birdOTDDetails.size.length.value
        }${birdOTDDetails.size.length.units}</span></div>
				<div><span class="botd-info-label">Weight:</span> <span class="botd-info-value">${
          birdOTDDetails.size.weight.value
        }${birdOTDDetails.size.weight.units}</span></div>
			</div>
			${getConservationStatusTagHTML(birdOTDDetails.status)}
		</div>
		<figure class="botd-bird-figure">
			<img class="botd-bird-image" src="${
        birdOTDDetails.photo.source
      }" alt="Bird of the day: ${birdOTDDetails.primary_name}" />
			<figcaption>Photo by ${birdOTDDetails.photo.credit}</figcaption>
		</div>`;
}

export function getConservationStatusTagHTML(conservationStatus) {
  const csColor = conservationStatuses[conservationStatus];
  return `<div class="conservation-status-tag" style="--tag-color: ${csColor};">${conservationStatus}</div>`;
}
