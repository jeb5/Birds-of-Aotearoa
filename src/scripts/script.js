import { initializeBirdle } from "./birdle.js";
import { loadBirds } from "./birds.js";
import { performSearch } from "./search.js";
import {
  getMainPageHTML,
  getSideHeaderHeroHTML,
  getGalleryPageHTML,
} from "./templates.js";

const contentElement = document.getElementById("content");
const searchFields = {
  query: document.getElementById("search-field"),
  conservationStatus: document.getElementById("conservation-status-field"),
  sort: document.getElementById("sort-by-field"),
  sortOrder: document.getElementById("sort-order-field"),
};
const navButtons = {
  viewAll: document.getElementById("view-all-button"),
  birdSearch: document.getElementById("bird-search-button"),
};

const searchFieldDiv = document.getElementById("search-field-div");

let currentPage = null; // null, "main", "search"
let viewMode = "search"; // "search", "view-all"

async function loadContent() {
  await loadBirds();
  document.body.style.opacity = "1";

  handleFieldUpdate();
  Object.values(searchFields).forEach((field) => {
    field.addEventListener("input", handleFieldUpdate);
    field.addEventListener("focus", handleFieldUpdate);
  });

  navButtons.viewAll.addEventListener("click", setViewAllMode);
  navButtons.birdSearch.addEventListener("click", setSearchMode);
  setSearchMode();
}
loadContent();

function setSideHeader(toHero) {
  const sideHeader = document.getElementById("side-header");
  if (toHero) return (sideHeader.innerHTML = getSideHeaderHeroHTML());
  sideHeader.innerHTML = `<div id="side-header-find"><h2>Find a bird</h2></div>`;
}

const lastSearchData = {};
function handleFieldUpdate() {
  if (viewMode === "search") {
    if (searchFields.query.value.length > 0) openSearch();
    else return openMain();
  }
  const searchData = {
    query: viewMode === "search" ? searchFields.query.value : "",
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
  contentElement.innerHTML = getGalleryPageHTML();
}

function setViewAllMode() {
  navButtons.viewAll.disabled = true;
  navButtons.birdSearch.disabled = false;
  viewMode = "view-all";
  searchFieldDiv.classList.add("search-hidden");
  openSearch();
  handleFieldUpdate();
}

function setSearchMode() {
  navButtons.viewAll.disabled = false;
  navButtons.birdSearch.disabled = true;
  viewMode = "search";
  searchFieldDiv.classList.remove("search-hidden");
  handleFieldUpdate();
}
