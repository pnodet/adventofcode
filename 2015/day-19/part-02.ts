const file = await Deno.readTextFile("./input.txt");
let [replacementsList, molecule] = file.split("\n\n");
const replacements = replacementsList.split("\n").map((line) => {
  const [from, to] = line.split(" => ");
  return { from, to };
});

let steps = 0;

while (molecule !== "e") {
  for (const { from, to } of replacements) {
    if (molecule.includes(to)) {
      // inverse replacements (to => from)
      molecule = molecule.replace(to, from);
      steps++;
    }
  }
}

console.log("result", steps);
