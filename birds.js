export let birds;
import { strHash } from "./utils.js";

export async function loadBirds() {
  const response = await fetch("./data/nzbird.json");
  birds = await response.json();
  return;
}

export function getBirdOTDDetails() {
  const BOTDIndex = strHash(new Date().toDateString()) % birds.length;
  const BOTD = birds[BOTDIndex];
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
