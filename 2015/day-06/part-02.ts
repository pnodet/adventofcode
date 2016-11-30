import { createMatrix, updateMatrix } from "../../utils/index.ts";

const file = await Deno.readTextFile("./input.txt");
const data = file.split("\n");

let matrix = createMatrix<number>(1000, 1000, 0);

for (const line of data) {
	const action = line.match(/(turn on|turn off|toggle)/)?.[0];
	const [start, end] =
		line.match(/(\d+),(\d+)/g)?.map((coord) => coord.split(",").map(Number)) ??
		[];

	matrix = updateMatrix(
		matrix,
		(value) => {
			switch (action) {
				case "turn on":
					return value + 1;

				case "turn off":
					return Math.max(value - 1, 0);

				case "toggle":
					return value + 2;

				default:
					return value;
			}
		},
		start,
		end
	);
}

const result = matrix.flat().reduce((a, b) => a + b, 0);
console.log("result", result);
