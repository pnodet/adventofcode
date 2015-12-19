const file = await Deno.readTextFile("./input.txt");
const [replacementsList, molecule] = file.split("\n\n");
const replacements = replacementsList.split("\n").map((line) => {
  const [from, to] = line.split(" => ");
  return { from, to };
});

const molecules = new Set<string>();

for (const { from, to } of replacements) {
  let index = -1;
  while ((index = molecule.indexOf(from, index + 1)) !== -1) {
    const newMolecule = molecule.slice(0, index) + to +
      molecule.slice(index + from.length);
    molecules.add(newMolecule);
  }
}

console.log("result", molecules.size);
