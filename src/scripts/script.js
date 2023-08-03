import { initializeBirdle } from "./birdle.js";
import { loadBirds } from "./birds.js";
import { performSearch } from "./search.js";
import {
  getMainPageHTML,
  getSideHeaderHeroHTML,
  getSearchPageHTML,
} from "./templates.js";

const contentElement = document.getElementById("content");
const searchFields = {
  query: document.getElementById("search-field"),
  conservationStatus: document.getElementById("conservation-status-field"),
  sort: document.getElementById("sort-by-field"),
  sortOrder: document.getElementById("sort-order-field"),
};

let currentPage = null; // null, "main", "search"

async function loadContent() {
  await loadBirds();
  document.body.style.opacity = "1";
  handleFieldUpdate();
  Object.values(searchFields).forEach((field) => {
    field.addEventListener("input", handleFieldUpdate);
    field.addEventListener("focus", handleFieldUpdate);
  });
  searchFields.query.addEventListener("blur", () => {
    if (searchFields.query.value === "") setTimeout(openMain, 10);
  });
}
loadContent();

function setSideHeader(toHero) {
  const sideHeader = document.getElementById("side-header");
  if (toHero) return (sideHeader.innerHTML = getSideHeaderHeroHTML());
  sideHeader.innerHTML = `<div id="side-header-find"><h2>Find a bird</h2></div>`;
}

const lastSearchData = {};
function handleFieldUpdate() {
  if (searchFields.query.value.length > 0) openSearch();
  else return openMain();
  const searchData = {
    query: searchFields.query.value,
    conservationFilter: searchFields.conservationStatus.value,
    sortMetric: searchFields.sort.value,
    ascending: searchFields.sortOrder.value === "ascending",
  };
  //Check if the search data has changed
  const changed = Object.keys(searchData).some((key) => {
    return searchData[key] !== lastSearchData[key];
  });

  if (changed) performSearch(searchData);
}

function openSearch() {
  if (currentPage == "search") return;
  loadSearchPage();
  currentPage = "search";
}
function openMain() {
  if (currentPage === "main") return;
  loadMainPage();
  currentPage = "main";
}
function loadMainPage() {
  setSideHeader(false);
  contentElement.innerHTML = getMainPageHTML();
  initializeBirdle();
}
function loadSearchPage() {
  setSideHeader(true);
  contentElement.innerHTML = getSearchPageHTML();
}
