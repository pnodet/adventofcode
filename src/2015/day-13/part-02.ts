import { permutator } from "../../utils/index.ts";

const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");
const lines = file.split("\n");

const people = new Map<string, Map<string, number>>();

for (const line of lines) {
  const name = line.split(" ")[0];
  const sign = line.split(" ")[2];
  const happiness = parseInt(line.split(" ")[3], 10);
  const neighbor = line.split(" ")[10].replace(".", "");

  if (!people.has(name)) people.set(name, new Map());
  people.get(name)!.set(neighbor, sign === "gain" ? happiness : -happiness);
}

people.forEach((value) => value.set("Paul", 0));
people.set("Paul", new Map([...people.keys()].map((key) => [key, 0])));

const possibleSeatings = new Map(
  permutator(Array.from(people.keys())).map((value) => [value, 0]),
);

let result = -Infinity;

Array.from(possibleSeatings.keys()).forEach((seating) => {
  let total = 0;

  for (let i = 0; i < seating.length; i++) {
    const left = seating[i - 1] ?? seating[seating.length - 1];
    const right = seating[i + 1] ?? seating[0];

    total += people.get(seating[i])!.get(left)!;
    total += people.get(seating[i])!.get(right)!;
  }

  possibleSeatings.set(seating, total);
  if (total > result) result = total;
});

console.log("result", result);
