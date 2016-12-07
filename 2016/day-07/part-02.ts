const file = await Deno.readTextFile("./input.txt");
const ips = file.trim().split("\n");

const findABAs = (str: string): string[] => {
	const abas = [];
	for (let i = 0; i <= str.length - 3; i++) {
		const segment = str.slice(i, i + 3);
		if (segment[0] === segment[2] && segment[0] !== segment[1]) {
			abas.push(segment);
		}
	}
	return abas;
};

let count = 0;

for (const ip of ips) {
	const hypernetSequences: string[] = [];
	const otherSequences: string[] = [];

	let buffer = "";
	let inHypernet = false;

	for (const char of ip) {
		if (char === "[") {
			otherSequences.push(buffer);
			buffer = "";
			inHypernet = true;
		} else if (char === "]") {
			hypernetSequences.push(buffer);
			buffer = "";
			inHypernet = false;
		} else {
			buffer += char;
		}
	}

	if (buffer) {
		inHypernet ? hypernetSequences.push(buffer) : otherSequences.push(buffer);
	}

	const abas = otherSequences.flatMap(findABAs);
	const babs = abas.map((aba) => aba[1] + aba[0] + aba[1]);

	if (
		abas.length > 0 &&
		hypernetSequences.some((hs) => babs.some((bab) => hs.includes(bab)))
	) {
		count++;
	}
}

console.log(count);
