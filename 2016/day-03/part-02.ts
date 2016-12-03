const file = await Deno.readTextFile("./input.txt");

let result = 0;

const lines = file.trim().split("\n");

const split = (line: string) =>
	line
		.trim()
		.split(/\s+/)
		.map((n) => parseInt(n, 10));

for (let i = 0; i < lines.length; i += 3)
	for (let j = 0; j < 3; j++) {
		const [a, b, c] = [
			split(lines[i])[j],
			split(lines[i + 1])[j],
			split(lines[i + 2])[j],
		];
		if (a + b > c && a + c > b && b + c > a) result += 1;
	}

console.log("result", result);
