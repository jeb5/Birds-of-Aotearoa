export let birds;
import { DAY_NUMBER, seededShuffle } from "./utils.js";

export let birdOrder;
export let BOTD_DETAILS;
export let BIRDLE_DETAILS;

export async function loadBirds() {
  const response = await fetch("./data/nzbird.json");
  birds = await response.json();
  birdOrder = seededShuffle(birds, "arandomseed");
  BOTD_DETAILS = getBirdOTDDetails();
  BIRDLE_DETAILS = getBirdleDetails();
}

function getBirdOTDDetails() {
  const BOTDIndex = DAY_NUMBER % birds.length;
  const BOTD = birdOrder[BOTDIndex];
  return BOTD;
}

export const conservationStatuses = {
  "Not Threatened": "#02a028",
  "Naturally Uncommon": "#649a31",
  Relict: "#99cb68",
  Recovering: "#fecc33",
  Declining: "#fe9a01",
  "Nationally Increasing": "#c26967",
  "Nationally Vulnerable": "#960000",
  "Nationally Endangered": "#660032",
  "Nationally Critical": "#320033",
  Extinct: "black",
  "Data Deficient": "black",
};

function getBirdleDetails() {
  const birdleBird = birdOrder[(DAY_NUMBER + 20) % birds.length];
  const birdleOptions = [birdleBird];
  const newlyShuffledBirds = seededShuffle(birds, birdleBird.primary_name);
  for (let i = 0; birdleOptions.length < 15; i++) {
    if (newlyShuffledBirds[i].primary_name === birdleBird.primary_name)
      continue;
    if (newlyShuffledBirds[i].primary_name === BOTD_DETAILS.primary_name)
      continue;
    birdleOptions.push(newlyShuffledBirds[i]);
  }
  return {
    birdleBird,
    birdleOptions: seededShuffle(birdleOptions, birdleBird.english_name),
    hints: [
      birdleBird.english_name,
      birdleBird.scientific_name,
      birdleBird.status,
      `${birdleBird.size.length.value}${birdleBird.size.length.units}, ${birdleBird.size.weight.value}${birdleBird.size.weight.units}`,
    ],
  };
}
