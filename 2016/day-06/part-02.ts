const file = await Deno.readTextFile("./input.txt");
const lines = file.trim().split("\n");

const frequencyMaps: Map<string, number>[] = [];

for (let i = 0; i < lines[0].length; i++)
	frequencyMaps.push(new Map<string, number>());

for (const line of lines) {
	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		const map = frequencyMaps[i];
		map.set(char, (map.get(char) || 0) + 1);
	}
}

const originalMessage = frequencyMaps
	.map(
		(map) =>
			Array.from(map.entries())
				.sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]))
				.map(([char]) => char)[0]
	)
	.join("");

console.log(originalMessage);
