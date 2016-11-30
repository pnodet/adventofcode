const file = await Deno.readTextFile("./input.txt");
const data = file.split("\n");

let result = 0;

data.forEach((string) => {
  const vowels = string.match(/[aeiou]/g);
  const double = string.match(/([a-z])\1/g);
  const forbidden = string.match(/(ab|cd|pq|xy)/g);

  if (vowels && vowels.length >= 3 && double && !forbidden) result++;
});

console.log("result", result);
