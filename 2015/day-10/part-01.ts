const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");

const MAX_ITERATIONS = 40;

const lookAndSay = (input: string): string => {
  let result = "";
  let current = input[0];
  let count = 1;

  for (let i = 1; i < input.length; i++) {
    if (input[i] === current) {
      count++;
    } else {
      result += count + current;
      current = input[i];
      count = 1;
    }
  }
  result += count + current;
  return result;
};

const result = Array.from({ length: MAX_ITERATIONS }).reduce(
  (acc: string) => lookAndSay(acc),
  file,
);

console.log("result", result.length);
