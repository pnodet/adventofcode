const file = await Deno.readTextFile("./input.txt");
const lines = file.split("\n");

type Data = { speed: number; fly: number; rest: number };
const reindeers = new Map<string, Data>();

for (const line of lines) {
  const name = line.split(" ")[0];
  const speed = parseInt(line.split(" ")[3], 10);
  const fly = parseInt(line.split(" ")[6], 10);
  const rest = parseInt(line.split(" ")[13], 10);

  reindeers.set(name, { speed, fly, rest });
}

const getDistance = (current: Data, time: number) => {
  const { speed, fly, rest } = current;
  const cycles = Math.floor(time / (fly + rest));
  const remaining = time % (fly + rest);
  const distance = cycles * speed * fly + Math.min(remaining, fly) * speed;
  return distance;
};

const MAX_TIME = 2503;
let result = -Infinity;

reindeers.forEach((current) => {
  const distance = getDistance(current, MAX_TIME);
  result = Math.max(result, distance);
});

console.log("result", result);
