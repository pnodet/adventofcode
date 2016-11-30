const input = await Deno.readTextFile("./input.json");
const json = JSON.parse(input);

const sum = (obj: any): number => {
  if (typeof obj === "number") return obj;
  if (Array.isArray(obj)) return obj.reduce((acc, val) => acc + sum(val), 0);

  if (typeof obj === "object") {
    if (Object.values(obj).includes("red")) return 0;
    return Object.values(obj).reduce((acc, val) => acc + sum(val), 0);
  }

  return 0;
};

console.log("sum", sum(json));
