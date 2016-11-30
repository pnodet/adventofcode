const file = await Deno.readTextFile("./input.txt");
const data = file.split("\n");

const results = data.map((gift) => {
  const [l, w, h] = gift.split("x").map(Number);
  const lw = l * w;
  const wh = w * h;
  const hl = h * l;
  const slack = Math.min(lw, wh, hl);
  const area = 2 * (lw + wh + hl) + slack;
  return area;
});

const total = results.reduce((a, b) => a + b, 0);

console.log("total", total);
