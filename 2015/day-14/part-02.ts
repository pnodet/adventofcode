const file = await Deno.readTextFile("./input.txt");
const lines = file.split("\n");

type Data = { speed: number; fly: number; rest: number; score: number };
const reindeers = new Map<string, Data>();

for (const line of lines) {
  const name = line.split(" ")[0];
  const speed = parseInt(line.split(" ")[3], 10);
  const fly = parseInt(line.split(" ")[6], 10);
  const rest = parseInt(line.split(" ")[13], 10);

  reindeers.set(name, { speed, fly, rest, score: 0 });
}

const getDistance = (current: Data, time: number) => {
  const { speed, fly, rest } = current;
  const cycles = Math.floor(time / (fly + rest));
  const remaining = time % (fly + rest);
  const distance = cycles * speed * fly + Math.min(remaining, fly) * speed;
  return distance;
};

const MAX_TIME = 2503;

for (let time = 1; time <= MAX_TIME; time++) {
  const distances = new Map<number, string[]>();

  reindeers.forEach((current, name) => {
    const distance = getDistance(current, time);
    if (!distances.has(distance)) distances.set(distance, []);
    distances.get(distance)!.push(name);
  });

  const maxDistance = Math.max(...distances.keys());
  const winners = distances.get(maxDistance)!;
  winners.forEach((name) => reindeers.get(name)!.score++);
}

console.log("reindeers", reindeers);
