import { permutator } from "../../utils/index.ts";

const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");
const data = file.split("\n").map((line) => line.split(" "));

const graph = new Map<string, Map<string, number>>();

for (const [from, , to, , distance] of data) {
	if (!graph.has(from)) {
		graph.set(from, new Map());
	}

	if (!graph.has(to)) {
		graph.set(to, new Map());
	}

	graph.get(from)!.set(to, parseInt(distance));
	graph.get(to)!.set(from, parseInt(distance));
}

const cities = Array.from(graph.keys());
const allPossibleRoutes = permutator(cities);

const distances = allPossibleRoutes.map((route) => {
	let distance = 0;

	for (let i = 0; i < route.length - 1; i++) {
		distance += graph.get(route[i])!.get(route[i + 1])!;
	}

	return distance;
});

const shortest = Math.min(...distances);

console.log("shortest", shortest);
