const file = await Deno.readTextFile("./input.txt");
const input = file.split("\n");

const c = [-1, 0, 1];
const t: Record<number, number[]> = { 1: [2, 3], 0: [3] };

const matrix = input.map((line) =>
  line.split("").map((cell) => cell === "#" ? 1 : 0)
);

const neighbors = (matrix: number[][], x: number, y: number) =>
  c.reduce(
    (r, a) =>
      r + c.reduce((r, b) => r + ((matrix[x + a] || {})[y + b] || 0), 0),
    0,
  ) - matrix[x][y];

const iterate = (r: number[]) =>
  r.map((_, x: number) =>
    // @ts-expect-error Speed over type safety
    r.map((_, y: number) => +!!~t[r[x][y]].indexOf(neighbors(r, x, y)))
  );

const fix = (matrix: number[][]) => {
  matrix[99][0] = matrix[0][99] = 1;
  matrix[0][0] = matrix[99][99] = 1;
  return matrix;
};

const result = [...Array(100)].reduce(
  (row: number[]) => fix(iterate(row)),
  fix(matrix),
)
  .reduce(
    (acc: number, val: number[]) =>
      acc + val.reduce((acc: number, val: number) => acc + val, 0),
    0,
  );

console.log("result", result);
