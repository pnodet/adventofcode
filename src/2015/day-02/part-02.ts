const file = await Deno.readTextFile("./input.txt");
const data = file.split("\n");

const results = data.map((gift) => {
  const [l, w, h] = gift.split("x").map(Number);
  const mins = [l, w, h].sort((a, b) => a - b).slice(0, 2);
  const ribbon = 2 * (mins[0] + mins[1]);
  const bow = l * w * h;
  return ribbon + bow;
});

const total = results.reduce((a, b) => a + b, 0);

console.log("total", total);
