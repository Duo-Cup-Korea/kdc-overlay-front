export function secondsToMMSS(seconds) {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
}

export function overlap(elem1, elem2) {
  const rect1 = elem1.getBoundingClientRect();
  const rect2 = elem2.getBoundingClientRect();
  console.log(rect1, rect2);
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}
