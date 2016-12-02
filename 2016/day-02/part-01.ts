const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");
const lines = file.split("\n");

const dirs = {
	U: -3,
	D: 3,
	L: -1,
	R: 1,
};

type Order = "U" | "D" | "L" | "R";

const isEdgeCase = (current: number, order: Order) => {
	const leftEdge = [1, 4, 7];
	const rightEdge = [3, 6, 9];
	return (
		(leftEdge.includes(current) && order === "L") ||
		(rightEdge.includes(current) && order === "R")
	);
};

let start = 5;
const code = [];

for (const line of lines) {
	const orders = line.trim().split("") as Order[];
	if (orders.length === 0) break;

	start = orders.reduce((acc, order) => {
		if (isEdgeCase(acc, order)) return acc;
		const next = acc + dirs[order];
		return next >= 1 && next <= 9 ? next : acc;
	}, start);

	code.push(start);
}

console.log(code.join(""));
