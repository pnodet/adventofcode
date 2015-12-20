const file = await Deno.readTextFile("./input.txt");
const target = Number(file);
const max = target / 10;

const house = new Array(max).fill(10);

for (let elves = 2; elves < max; elves++) {
  for (let h = elves; h < max; h += elves) {
    house[h] += elves * 10;
  }
}

const result = house.reduce((r, v, i) => v > target && !r ? i : r, 0);

console.log("result", result);
