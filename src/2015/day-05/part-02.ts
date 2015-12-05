const file = await Deno.readTextFile("./input.txt");
const data = file.split("\n");

let result = 0;

data.forEach((string) => {
  const double = string.match(/([a-z]{2}).*\1/g);
  const repeating = string.match(/([a-z]).\1/g);

  if (double && repeating) result++;
});

console.log("result", result);
