import { BOTD_DETAILS, conservationStatuses, BIRDLE_DETAILS } from "./birds.js";

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
			<section>
			<div class="section-header">
				<h3>Play Birdle</h3>
				<hr />
			</div>
			${getBirdleHTML()}
			</section>
		</main>
	</div>
	`;
}
export function getBirdOTDHTML() {
  return `<div class="container botd-container">
		<div class="botd-bird-info">
			<h4>${BOTD_DETAILS.primary_name}</h4>
			<h5>${BOTD_DETAILS.english_name}</h5>
			<div class="botd-bird-extra-info">
				<div><span class="botd-info-label">Scientific name:</span> <span class="botd-info-value">${
          BOTD_DETAILS.scientific_name
        }</span></div>
				<div><span class="botd-info-label">Family:</span> <span class="botd-info-value">${
          BOTD_DETAILS.family
        }</span></div>
				<div><span class="botd-info-label">Order:</span> <span class="botd-info-value">${
          BOTD_DETAILS.order
        }</span></div>
				<div><span class="botd-info-label">Length:</span> <span class="botd-info-value">${
          BOTD_DETAILS.size.length.value
        }${BOTD_DETAILS.size.length.units}</span></div>
				<div><span class="botd-info-label">Weight:</span> <span class="botd-info-value">${
          BOTD_DETAILS.size.weight.value
        }${BOTD_DETAILS.size.weight.units}</span></div>
			</div>
			${getConservationStatusTagHTML(BOTD_DETAILS.status)}
		</div>
		<figure class="botd-bird-figure">
			<img class="botd-bird-image" src="${
        BOTD_DETAILS.photo.source
      }" alt="Bird of the day: ${BOTD_DETAILS.primary_name}" />
			<figcaption>Photo by ${BOTD_DETAILS.photo.credit}</figcaption>
		</div>`;
}

export function getBirdleHTML() {
  return `<div id="birdle-container" class="container">
		<div id="birdle-top">
			<div id="birdle-top-bar">
				<h3 id="birdle-prompt">Pick the <strong>${
          BIRDLE_DETAILS.birdleBird.primary_name
        }</strong></h3>
				<div id="birdle-guess-counter">Guess 1 / 5</div>
			</div>
				<div id="birdle-board">
				${new Array(15)
          .fill(0)
          .map((_, i) => {
            const currBird = BIRDLE_DETAILS.birdleOptions[i];
            return `<div class="birdle-choice" data-birdname="${
              currBird.primary_name
            }">
							<img src="${currBird.photo.source}" alt="Mystery Bird #${i + 1}"/>
						</div>`;
          })
          .join("\n")}
				</div>
			</div>
			<div id="birdle-bottom">
				<div class="birdle-hint-container">
					<div class="birdle-hint-label">English Name</div>
					<div id="birdle-hint-1" class="birdle-hint-value">?????????????</div>
				</div>
				<div class="birdle-hint-container">
					<div class="birdle-hint-label">Scientific Name</div>
					<div id="birdle-hint-2" class="birdle-hint-value">?????????????</div>
				</div>
				<div class="birdle-hint-container">
					<div class="birdle-hint-label">Conservation Status</div>
					<div id="birdle-hint-3" class="birdle-hint-value">?????????????</div>
				</div>
				<div class="birdle-hint-container">
					<div class="birdle-hint-label">Size</div>
					<div id="birdle-hint-4" class="birdle-hint-value">?????????????</div>
				</div>
			</div>
	</div>
	`;
}

function getConservationStatusTagHTML(conservationStatus) {
  const csColor = conservationStatuses[conservationStatus];
  return `<div class="conservation-status-tag" style="--tag-color: ${csColor};">${conservationStatus}</div>`;
}

export function getSearchPageHTML() {
  return `<div id="search-page">
	</div>`;
}

export function getSideHeaderHeroHTML() {
  return `
		<div id="side-header-hero">
			<img src="./icon.svg" alt="Birds of Aotearoa Kiwi Logo" />
			<h2>Birds of Aotearoa</h2>
		</div>
	`;
}