import { addBirdleListeners } from "./birdle.js";
import { loadBirds } from "./birds.js";
import {
  getMainPageHTML,
  getSideHeaderHeroHTML,
  getSearchPageHTML,
} from "./templates.js";
const contentElement = document.getElementById("content");
const searchElement = document.getElementById("search-field");

let onSearchPage = false;

async function loadContent() {
  await loadBirds();
  document.body.style.opacity = "1";
  loadMainPage();
  const inputListener = () => {
    if (searchElement.value.length > 0 && !onSearchPage) {
      onSearchPage = true;
      loadSearchPage();
    } else if (searchElement.value.length === 0 && onSearchPage) {
      onSearchPage = false;
      loadMainPage();
    }
  };
  searchElement.addEventListener("input", inputListener);
  searchElement.addEventListener("focus", inputListener);
}
loadContent();

function loadMainPage() {
  setSideHeader(false);
  contentElement.innerHTML = getMainPageHTML();
  addBirdleListeners();
}
function loadSearchPage() {
  setSideHeader(true);
  contentElement.innerHTML = getSearchPageHTML();
}

function setSideHeader(toHero) {
  const sideHeader = document.getElementById("side-header");
  if (toHero) return (sideHeader.innerHTML = getSideHeaderHeroHTML());
  sideHeader.innerHTML = `<div id="side-header-find"><h2>Find a bird</h2></div>`;
}
