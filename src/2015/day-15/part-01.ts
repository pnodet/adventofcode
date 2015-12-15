const file = await Deno.readTextFile("./input.txt");

const ingredients = file.split("\n").map((s) =>
  s.match(/(-?\d)/g)!.map(Number)
);

const possibleSolutions = [];

for (let capacity = 0; capacity < 101; capacity++) {
  for (let durability = 1; durability < 101; durability++) {
    for (let flavor = 0; flavor < 101; flavor++) {
      for (let texture = 0; texture < 101; texture++) {
        if (
          capacity + durability + flavor + texture === 100 &&
          3 * capacity - 3 * durability - flavor > 0 &&
          4 * flavor - 2 * texture > 0 &&
          2 * texture - 3 * capacity > 0
        ) {
          possibleSolutions.push([capacity, durability, flavor, texture]);
        }
      }
    }
  }
}

const result = possibleSolutions
  .map((currentSolution) =>
    currentSolution.map((teaspoons, index) =>
      ingredients[index].map((value) => value * teaspoons)
    )
  )
  .map((currentSolution) =>
    currentSolution.reduce(
      (acc, val) => acc.map((ingredient, index) => ingredient + val[index]),
      [0, 0, 0, 0, 0],
    )
  )
  .map((currentSolution) =>
    currentSolution.slice(0, 4).reduce((acc, val) => acc * val, 1)
  )
  .reduce((acc, val) => (acc > val ? acc : val), 0);

console.log("result", result);
