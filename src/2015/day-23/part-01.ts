const file = await Deno.readTextFile("./input.txt");
const lines = file.split("\n").filter((line) => line.length > 0);

const reg: Record<"a" | "b", number> = {
	a: 0,
	b: 0,
};

for (let pointer = 0; pointer < lines.length; ) {
	const line = lines[pointer];

	const [xx, yy] = line.split(", ");
	const [instruction, buff] = xx.split(" ") as [string, "a" | "b"];

	if (["jmp", "jio", "jie"].includes(instruction)) {
		const offset = Number.parseInt(
			instruction === "jmp" ? line.split(" ")[1] : yy,
			10
		);

		switch (instruction) {
			case "jmp": {
				pointer += offset;
				break;
			}

			case "jie": {
				pointer += reg[buff] % 2 === 0 ? offset : 1;
				break;
			}

			case "jio": {
				pointer += reg[buff] === 1 ? offset : 1;
				break;
			}
		}

		continue;
	}

	pointer++;

	switch (instruction) {
		case "hlf": {
			reg[buff] /= 2;
			break;
		}

		case "tpl": {
			reg[buff] *= 3;
			break;
		}

		case "inc": {
			reg[buff]++;
			break;
		}
	}
}

console.log(reg);
