import "./seedrandom.js";

// /** Adapted from https://stackoverflow.com/a/8831937/14900196 */
// export function strHash(str) {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = (hash << 5) - hash + str.charCodeAt(i);
//     hash = hash & hash; // Convert to 32bit integer
//   }
//   return Math.abs(hash);
// }

export function seededShuffle(arr, seed) {
  const rng = new Math.seedrandom(seed);
  const shuffled = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(rng() * (arr.length - i)) + i;
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
function getDayNumber() {
  const timezoneOffset = new Date().getTimezoneOffset();
  const minutesSinceEpoch = Date.now() / (1000 * 60) + timezoneOffset;
  const daysSinceEpoch = minutesSinceEpoch / (60 * 24);
  return Math.floor(daysSinceEpoch);
}
export const DAY_NUMBER = getDayNumber();

export function formatWeight(value, units) {
  if (units === "g" && value > 1000) return `${value / 1000}kg`;
  return `${value}${units}`;
}