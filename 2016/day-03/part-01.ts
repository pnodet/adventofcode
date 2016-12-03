const file = await Deno.readTextFile("./input.txt");

let result = 0;

const split = (line: string) =>
	line
		.trim()
		.split(/\s+/)
		.map((n) => parseInt(n, 10));

for (const line of file.trim().split("\n")) {
	const [a, b, c] = split(line);
	if (a + b > c && a + c > b && b + c > a) result += 1;
}

console.log("result", result);
