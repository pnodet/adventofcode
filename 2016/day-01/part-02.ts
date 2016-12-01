const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");

let latitude = 0;
let longitude = 0;
let heading = 0;

const visited = new Set<string>(["0,0"]);
const check = (pos: string) => {
	if (visited.has(`${latitude},${longitude}`)) {
		console.log("Output:", Math.abs(latitude) + Math.abs(longitude));
		Deno.exit(0);
	}
	visited.add(pos);
};

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
			for (let i = 0; i < length; i++) {
				latitude += 1;
				check(`${latitude},${longitude}`);
			}
			break;
		}
		case 90: {
			for (let i = 0; i < length; i++) {
				longitude += 1;
				check(`${latitude},${longitude}`);
			}
			break;
		}
		case 180: {
			for (let i = 0; i < length; i++) {
				latitude -= 1;
				check(`${latitude},${longitude}`);
			}
			break;
		}
		case 270: {
			for (let i = 0; i < length; i++) {
				longitude -= 1;
				check(`${latitude},${longitude}`);
			}
			break;
		}
	}
}
