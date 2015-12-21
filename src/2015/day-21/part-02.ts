import { armors, rings, weapons } from "./store.ts";

const getKeyValue = <
  K extends string,
  R extends Record<string, Record<K, number>>,
>(
  record: R,
  key: K,
) =>
  Object.values(record).reduce(
    (r, v) => r + v[key],
    0,
  );

const possibleCombinations = weapons.map((weapon) =>
  armors.map((armor) =>
    rings.map((ring1) =>
      rings.map((ring2) => ({ weapon, armor, ring1, ring2 }))
    )
  )
).flat(3);

const combinations = possibleCombinations.filter(
  ({ ring1, ring2 }) => ring1.id !== ring2.id,
);

type Entity = {
  hp: number;
  damage: number;
  armor: number;
};

const isAlive = (entity: Entity) => entity.hp > 0;

const attack = (attacker: Entity, defender: Entity) => {
  defender.hp -= Math.max(1, attacker.damage - defender.armor);
};

const fight = (player: Entity, boss: Entity) => {
  attack(player, boss);
  if (isAlive(boss)) attack(boss, player);
  if (isAlive(player) && isAlive(boss)) fight(player, boss);
};

const result = combinations
  .map((combination) => {
    const player: Entity = {
      hp: 100,
      damage: getKeyValue(combination, "damage"),
      armor: getKeyValue(combination, "armor"),
    };

    const boss: Entity = {
      hp: 100,
      damage: 8,
      armor: 2,
    };

    fight(player, boss);

    return {
      cost: getKeyValue(combination, "cost"),
      won: isAlive(boss),
    };
  })
  .filter((result) => result?.won === true)
  .reduce((acc, result) => (acc!.cost > result!.cost ? acc : result), {
    cost: -Infinity,
    won: false,
  });

console.log("result", result);
