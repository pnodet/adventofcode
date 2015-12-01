const file = await Deno.readTextFile("./input.txt");
const data = file.split("");

let floor = 0;
for (const move of data) {
  floor = move === "(" ? floor + 1 : floor - 1;
}

console.log("floor", floor);
