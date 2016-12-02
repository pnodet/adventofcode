const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");
const lines = file.split("\n");

const keypad = {
	"1": { U: "1", D: "3", L: "1", R: "1" },
	"2": { U: "2", D: "6", L: "2", R: "3" },
	"3": { U: "1", D: "7", L: "2", R: "4" },
	"4": { U: "4", D: "8", L: "3", R: "4" },
	"5": { U: "5", D: "5", L: "5", R: "6" },
	"6": { U: "2", D: "A", L: "5", R: "7" },
	"7": { U: "3", D: "B", L: "6", R: "8" },
	"8": { U: "4", D: "C", L: "7", R: "9" },
	"9": { U: "9", D: "9", L: "8", R: "9" },
	A: { U: "6", D: "A", L: "A", R: "B" },
	B: { U: "7", D: "D", L: "A", R: "C" },
	C: { U: "8", D: "C", L: "B", R: "C" },
	D: { U: "B", D: "D", L: "D", R: "D" },
};

type Order = "U" | "D" | "L" | "R";

let start = "5";
const code = [];

for (const line of lines) {
	const orders = line.trim().split("") as Order[];
	if (orders.length === 0) break;

	start = orders.reduce((acc, order) => {
		return keypad[acc as keyof typeof keypad][order];
	}, start);

	code.push(start);
}

console.log(code.join(""));
