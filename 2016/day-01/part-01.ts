const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");

let latitude = 0;
let longitude = 0;
let heading = 0;

const instructions = file.replaceAll("\n", "").split(", ");

for (const instruction of instructions) {
	const [direction, ...lnt] = instruction.split("");
	const length = Number.parseInt(lnt.join(""), 10);

	if (direction === "R") heading += 90;
	if (direction === "L") heading -= 90;

	if (heading === 360) heading = 0;
	if (heading === -90) heading = 270;

	switch (heading) {
		case 0: {
			latitude += length;
			break;
		}
		case 90: {
			longitude += length;
			break;
		}
		case 180: {
			latitude -= length;
			break;
		}
		case 270: {
			longitude -= length;
			break;
		}
	}
}

console.log("Output:", Math.abs(longitude) + Math.abs(latitude));
