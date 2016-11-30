import md5 from "npm:md5@latest";

const input = await Deno.readTextFile("./input.txt");

let result = 0;
while (!md5(input + result).startsWith("000000")) result++;

console.log("result", result);
