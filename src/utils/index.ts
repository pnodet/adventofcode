export const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

export const toChunks = <T>(array: T[], chunkSize: number) => {
  const res = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};
