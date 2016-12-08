const file = await Deno.readTextFile("./input.txt");
const lines = file.trim().split("\n");

const screen = Array.from({ length: 6 }, () => Array(50).fill("."));

for (const line of lines) {
	const rectMatch = line.match(/rect (\d+)x(\d+)/);
	const rowMatch = line.match(/rotate row y=(\d+) by (\d+)/);
	const colMatch = line.match(/rotate column x=(\d+) by (\d+)/);

	if (rectMatch) {
		const [_, width, height] = rectMatch.map(Number);
		for (let row = 0; row < height; row++) {
			for (let col = 0; col < width; col++) {
				screen[row][col] = "#";
			}
		}
	} else if (rowMatch) {
		const [_, row, shift] = rowMatch.map(Number);
		const newRow = [...screen[row]];
		for (let col = 0; col < 50; col++) {
			newRow[(col + shift) % 50] = screen[row][col];
		}
		screen[row] = newRow;
	} else if (colMatch) {
		const [_, col, shift] = colMatch.map(Number);
		const newCol = screen.map((row) => row[col]);
		for (let row = 0; row < 6; row++) {
			screen[(row + shift) % 6][col] = newCol[row];
		}
	}
}

const litPixels = screen.flat().filter((pixel) => pixel === "#").length;
console.log(litPixels);
