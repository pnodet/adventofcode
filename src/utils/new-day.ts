const DAY = 22;
const YEAR = 2015;

const template = (): Uint8Array => {
  const encoder = new TextEncoder();
  const data = encoder.encode(
    `const TEST = false;
const file = await Deno.readTextFile(TEST ? "./sample.txt" : "./input.txt");
console.log("file", file);\n`,
  );
  return data;
};

const formatDay = (day: number | string) => day.toString().padStart(2, "0");
const dir = `./src/${YEAR}/day-${formatDay(DAY)}`;
Deno.mkdirSync(dir);
Deno.writeFileSync(`${dir}/input.txt`, new Uint8Array());
Deno.writeFileSync(`${dir}/sample.txt`, new Uint8Array());
Deno.writeFileSync(`${dir}/part-01.ts`, template());
Deno.writeFileSync(`${dir}/part-02.ts`, template());
