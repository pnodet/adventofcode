const file = await Deno.readTextFile("./input.txt");
const target = Number(file);
const max = target / 11 >> 0;

const house = new Array(max).fill(11);

for (let elves = 2; elves < max; elves++) {
  let visited = 0;
  for (let h = elves; h < max && visited < 51; h += elves) {
    house[h] += elves * 11;
    visited++;
  }
}

const result = house.reduce((r, v, i) => v > target && !r ? i : r, 0);

console.log("result", result);
