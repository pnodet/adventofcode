const file = await Deno.readTextFile("./input.txt");
const lines = file.split("\n");

const aunts = new Map<number, Record<string, number>>();

for (const line of lines) {
  const [, aunt, ...rest] = line.match(/Sue (\d+): (.*)/)!;
  const properties = rest[0].split(", ").map((s) => s.split(": "));
  const auntProperties = properties.reduce(
    (acc, [property, value]) => ({ ...acc, [property]: Number(value) }),
    {},
  );
  aunts.set(Number(aunt), auntProperties);
}

const neededProperties = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

for (const [aunt, properties] of aunts) {
  let found = true;
  for (const [property, value] of Object.entries(neededProperties)) {
    if (properties[property] === undefined) continue;
    if (properties[property] === value) continue;

    found = false;
    break;
  }
  if (found) {
    console.log("aunt", aunt);
    break;
  }
}
