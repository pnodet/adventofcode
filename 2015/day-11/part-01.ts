const input = await Deno.readTextFile("./input.txt");

let password = input;

const hasPairs = (input: string) => input.match(/(.)\1.*(?!\1)(.)\2/);
const hasTrio = (input: string) =>
  input.match(/(abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/);
const hasStraight = (input: string) => input.match(/[a-z][a-z][a-z]/);
const hasForbiddenLetters = (input: string) => input.match(/[iol]/);

const isValid = (input: string) =>
  Boolean(
    hasPairs(input) && hasTrio(input) && hasStraight(input) &&
      !hasForbiddenLetters(input),
  );

const increment = (letter: string): string =>
  letter === "z" ? "a" : String.fromCharCode(letter.charCodeAt(0) + 1);

while (true) {
  password = password.slice(0, -1) + increment(password.slice(-1));

  for (let i = password.length - 1; i >= 0; i--) {
    if (password[i] === "a") {
      const prev = password[i - 1];
      password = password.slice(0, i - 1) + increment(prev) + password.slice(i);
    } else {
      break;
    }
  }

  if (isValid(password)) break;
}

console.log("password", password);
