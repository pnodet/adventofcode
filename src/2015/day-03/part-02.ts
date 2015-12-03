import { toChunks } from "../../utils/index.ts";

const file = await Deno.readTextFile("./input.txt");
const moves = file.split("");

const chunks = toChunks(moves, 2);
const locationSanta = { x: 0, y: 0 };
const locationRobo = { x: 0, y: 0 };
const visited = new Set();

for (const chunk of chunks) {
  const [santa, robo] = chunk;

  switch (santa) {
    case ">":
      locationSanta.x++;
      break;
    case "<":
      locationSanta.x--;
      break;
    case "^":
      locationSanta.y++;
      break;
    case "v":
      locationSanta.y--;
      break;
  }

  switch (robo) {
    case ">":
      locationRobo.x++;
      break;
    case "<":
      locationRobo.x--;
      break;
    case "^":
      locationRobo.y++;
      break;
    case "v":
      locationRobo.y--;
      break;
  }

  visited.add(`${locationSanta.x},${locationSanta.y}`);
  visited.add(`${locationRobo.x},${locationRobo.y}`);
}

console.log("visited", visited.size);
