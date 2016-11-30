const file = await Deno.readTextFile("./input.txt");
const input = file.split("\n");

const result = input.join().length -
  input.map((s) => s.replace(/\\\\|\\"|\\x[a-f0-9]{2}/g, "a")).join().length +
  input.length * 2;

console.log("result", result);
