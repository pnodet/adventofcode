const file = await Deno.readTextFile("./input.txt");
const input = file.split("\n");

const result = input.map((s) => s.replace(/\\|"/g, "aa") + "aa").join().length -
  input.join().length;

console.log("result", result);
