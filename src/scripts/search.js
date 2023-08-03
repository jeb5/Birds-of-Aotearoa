// type ConservationFilter =  "any" | <Conservation statuses>
// type SortMetric = "Maori Name" | "English Name" | "Conservation Status" | "Size" | "Length"
import { birds } from "./birds.js";
import { getGalleryHTML } from "./templates.js";

/** Filters and sorts the birds, and updates the gallery with the new birds */
export function performSearch({
  query,
  conservationFilter,
  sortMetric,
  ascending,
}) {
  const processedBirds = search(
    query,
    conservationFilter,
    sortMetric,
    ascending
  );
  updateGallery(processedBirds);
}

/*
A note on search.
I'm using a O(n) linear time searching algorithm here.
I was originally going to build an index at load time, and search through a dictionary with O(1) time, but that would only match full strings.
I could use a Trie to solve this problem, but given the size of the dataset, I went for the more straightforward solution.
*/
function search(query, conservationFilter, sortMetric, ascending) {
  const sortMethod = sortMethods[sortMetric];
  const normalizedQuery = query.normalize().toLowerCase();

  const processedBirds = birds
    .filter((bird) => testBird(bird, normalizedQuery, conservationFilter))
    .sort(sortMethod);

  return ascending ? processedBirds : processedBirds.reverse();
}

const statusOrder = {
  "Not Threatened": 0,
  "Naturally Uncommon": 1,
  Relict: 2,
  Recovering: 3,
  Declining: 4,
  "Nationally Increasing": 5,
  "Nationally Vulnerable": 6,
  "Nationally Endangered": 7,
  "Nationally Critical": 8,
  Extinct: 9,
  "Data Deficient": 10,
};
const sortMethods = {
  primary_name: (a, b) => a.primary_name.localeCompare(b.primary_name),
  english_name: (a, b) => a.english_name.localeCompare(b.english_name),
  scientific_name: (a, b) => a.scientific_name.localeCompare(b.scientific_name),
  status: (a, b) => statusOrder[a.status] - statusOrder[b.status],
  weight: (a, b) => a.size.weight.value - b.size.weight.value,
  length: (a, b) => a.size.length.value - b.size.length.value,
};

function testBird(bird, normalizedQuery, conservationFilter) {
  if (conservationFilter !== bird.status && conservationFilter !== "any")
    return false;
  if (
    [
      bird.primary_name,
      bird.english_name,
      bird.scientific_name,
      ...bird.other_names,
    ].some((name) => {
      return name.normalize().toLowerCase().includes(normalizedQuery);
    })
  )
    return true;
}

function updateGallery(newBirds) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = getGalleryHTML(newBirds);
}
