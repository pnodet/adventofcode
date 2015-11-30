const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");
console.log("file", file);
