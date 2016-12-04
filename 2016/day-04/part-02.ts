const file = await Deno.readTextFile("./input.txt");

let northPoleRoomSectorID = 0;

const decrypt = (encryptedName: string, sectorID: number) => {
	let decrypted = "";
	for (const char of encryptedName) {
		if (char === "-") {
			decrypted += " ";
		} else {
			const code = ((char.charCodeAt(0) - 97 + sectorID) % 26) + 97;
			decrypted += String.fromCharCode(code);
		}
	}
	return decrypted;
};

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

	if (sortedChars !== checksum) continue;
	const decryptedName = decrypt(encryptedName, parseInt(sectorID, 10));
	if (decryptedName.includes("north") && decryptedName.includes("pole")) {
		northPoleRoomSectorID = parseInt(sectorID, 10);
		break;
	}
}

console.log(northPoleRoomSectorID);
