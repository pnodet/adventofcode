const file = await Deno.readTextFile("./input.txt");
const containers = file.split("\n").map(Number);

const target = 150;
const possibleSolutions = [];

for (let i = 0; i < 2 ** containers.length; i++) {
  const binary = i.toString(2).padStart(containers.length, "0");
  const solution = binary.split("").map(Number);

  const sum = solution.reduce(
    (acc, val, index) => acc + val * containers[index],
    0,
  );

  if (sum === target) possibleSolutions.push(solution);
}

const minContainers = possibleSolutions
  .map((solution) => solution.reduce((acc, val) => acc + val, 0))
  .reduce((acc, val) => (acc < val ? acc : val), Infinity);

const result =
  possibleSolutions.filter((solution) =>
    solution.reduce((acc, val) => acc + val, 0) === minContainers
  ).length;

console.log("result", result);
