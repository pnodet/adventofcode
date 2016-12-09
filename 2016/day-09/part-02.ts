const file = await Deno.readTextFile("./input.txt");
const input = file.trim();

const decompressedLength = (input: string): number => {
	let length = 0;
	let i = 0;

	while (i < input.length) {
		if (input[i] === "(") {
			const markerEnd = input.indexOf(")", i);
			const marker = input.substring(i + 1, markerEnd);
			const [charCount, repeat] = marker.split("x").map(Number);

			const toDecompress = input.substring(
				markerEnd + 1,
				markerEnd + 1 + charCount
			);
			const decompressed = decompressedLength(toDecompress) * repeat;

			length += decompressed;
			i = markerEnd + 1 + charCount;
		} else {
			length += 1;
			i += 1;
		}
	}

	return length;
};

console.log(decompressedLength(input));
