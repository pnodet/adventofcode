const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");
const input = file.split("\n");

const converter = {
  AND: (a: number, b: number) => a & b,
  OR: (a: number, b: number) => a | b,
  LSHIFT: (a: number, b: number) => a << b,
  RSHIFT: (a: number, b: number) => a >> b,
  NOT: (_a: number, b: number) => b ^ 65535,
  VAL: (_a: number, b: number) => b,
};

const wires: Record<string, number> = {};

// deno-lint-ignore no-prototype-builtins
const test = (i: string) => !i || wires.hasOwnProperty(i) || /\d+/.test(i);
const val = (i: string) => wires[i] || +i;

while (input.length) {
  const [o, a, operator, b, c] = input?.shift()?.match(
    /([a-z0-9]*)\b\s?([A-Z]+)?\s?(\S+)\s->\s(\S+)/,
  ) ?? [];

  if (!test(c)) {
    if (test(a) && test(b)) {
      wires[c] = converter[operator as keyof typeof converter || "VAL"](
        val(a),
        val(b),
      );
    } else input.push(o);
  }
}

const result = wires.a;
console.log("result", result);
