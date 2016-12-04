const file = await Deno.readTextFile("./input.txt");

let sumOfSectorIDs = 0;

for (const line of file.trim().split("\n")) {
	const match = line.match(/^([a-z-]+)-(\d+)\[([a-z]+)\]$/);
	if (!match) continue;

	const [, encryptedName, sectorID, checksum] = match;

	const frequencyMap = new Map<string, number>();
	for (const char of encryptedName.replace(/-/g, ""))
		frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);

	const sortedChars = Array.from(frequencyMap.entries())
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
		.map(([char]) => char)
		.slice(0, 5)
		.join("");

	if (sortedChars === checksum) sumOfSectorIDs += parseInt(sectorID, 10);
}

console.log(sumOfSectorIDs);
