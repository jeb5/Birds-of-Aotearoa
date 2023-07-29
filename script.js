import { loadBirds } from "./birds.js";
import { getMainPageHTML, getBirdOTDHTML } from "./templates.js";
const contentElement = document.getElementById("content");

async function loadContent() {
  await loadBirds();
  document.body.style.opacity = "1";
  loadMainPage();
}
loadContent();

function loadMainPage() {
  contentElement.innerHTML = getMainPageHTML();
}
