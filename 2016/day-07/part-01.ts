const file = await Deno.readTextFile("./input.txt");
const ips = file.trim().split("\n");

const hasABBA = (str: string): boolean => {
	for (let i = 0; i <= str.length - 4; i++) {
		const segment = str.slice(i, i + 4);
		if (
			segment[0] === segment[3] &&
			segment[1] === segment[2] &&
			segment[0] !== segment[1]
		) {
			return true;
		}
	}
	return false;
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

	if (otherSequences.some(hasABBA) && !hypernetSequences.some(hasABBA)) {
		count++;
	}
}

console.log(count);
