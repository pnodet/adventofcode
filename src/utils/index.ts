export const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

export const toChunks = <T>(array: T[], chunkSize: number) => {
  const res = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

export const createMatrix = <T>(
  rows: number,
  cols: number,
  fill: T,
): T[][] => Array(rows).fill(fill).map(() => Array(cols).fill(fill));

export const updateMatrix = <T>(
  matrix: readonly T[][],
  operation: (value: T) => T,
  start: number[] = [0, 0],
  end: number[] = [matrix.length, matrix[0].length],
): T[][] => {
  const result = [...matrix];
  const [x1, y1] = start;
  const [x2, y2] = end;
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      result[x][y] = operation(result[x][y]);
    }
  }
  return result;
};

export const permutator = <T>(array: T[]): T[][] => {
  if (array.length === 1) return [array];
  const permutations = [];

  const smallerPermutations = permutator(array.slice(1));
  const firstOption = array[0];

  for (
    let permIndex = 0;
    permIndex < smallerPermutations.length;
    permIndex += 1
  ) {
    const smallerPermutation = smallerPermutations[permIndex];

    for (
      let positionIndex = 0;
      positionIndex <= smallerPermutation.length;
      positionIndex += 1
    ) {
      const permutationPrefix = smallerPermutation.slice(0, positionIndex);
      const permutationSuffix = smallerPermutation.slice(positionIndex);
      permutations.push(
        permutationPrefix.concat([firstOption], permutationSuffix),
      );
    }
  }

  return permutations;
};
