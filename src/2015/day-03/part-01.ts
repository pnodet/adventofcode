const file = await Deno.readTextFile("./input.txt");
const moves = file.split("");
const location = { x: 0, y: 0 };

const visited = new Set();

for (const move of moves) {
  switch (move) {
    case ">":
      location.x++;
      break;
    case "<":
      location.x--;
      break;
    case "^":
      location.y++;
      break;
    case "v":
      location.y--;
      break;
  }

  visited.add(`${location.x},${location.y}`);
}

console.log("location", location, "visited", visited.size);
