import { addBirdleListeners } from "./birdle.js";
import { loadBirds } from "./birds.js";
import { getMainPageHTML } from "./templates.js";
const contentElement = document.getElementById("content");

async function loadContent() {
  await loadBirds();
  document.body.style.opacity = "1";
  loadMainPage();
  addBirdleListeners();
}
loadContent();

function loadMainPage() {
  contentElement.innerHTML = getMainPageHTML();
}
