// Input
const boss = { hp: 55, dmg: 8 };

const player = { hp: 50, mana: 500, def: 0 };
let toCast: Record<string, Spell> = {};
let tmpCast: Record<string, Spell> = {};

type Spell = {
  name: string;
  cost: number;
  turns: number;
  spell: (spell: Spell) => void;
};

// Spells and effects
const magicMissile = () => boss.hp -= 4;
const drain = () => (boss.hp -= 2, player.hp += 2);
const shield = (spell: Spell) => (player.def = 7, recast(spell));
const poison = (spell: Spell) => (boss.hp -= 3, recast(spell));
const recharge = (spell: Spell) => (player.mana += 101, recast(spell));

const spells: Spell[] = [
  { name: "magic_missile", cost: 53, turns: 1, spell: magicMissile },
  { name: "drain", cost: 73, turns: 1, spell: drain },
  { name: "shield", cost: 113, turns: 6, spell: shield },
  { name: "poison", cost: 173, turns: 6, spell: poison },
  { name: "recharge", cost: 229, turns: 5, spell: recharge },
];

const recast = (spell: Spell): void => {
  spell.turns -= 1;
  if (spell.turns > 0) tmpCast[spell.name] = spell;
  else if (spell.turns <= 0 && spell.name == "shield") player.def = 0;
};

const cast = (): void => {
  Object.entries(toCast).forEach(([_, spell]) => {
    spell.spell(spell);
  });
  toCast = { ...tmpCast };
  tmpCast = {};
};

// Utils
const rand = (max: number) => Math.floor(Math.random() * max);

// Main
let minMana = Infinity;

const start = Date.now();
let running = true;

while (running) {
  let current = 0;
  let win = false;
  let lose = false;

  while (!win && !lose) {
    // Player turn
    cast();
    if (player.mana < 53 || player.hp <= 0) {
      lose = true;
      break;
    } else if (boss.hp <= 0) {
      win = true;
      break;
    }

    const possibleSpells = spells.filter((spell) =>
      !Object.keys(toCast).includes(spell.name) && spell.cost <= player.mana
    );

    const spell = possibleSpells[rand(possibleSpells.length)];
    player.mana -= spell.cost;
    current += spell.cost;
    toCast[spell.name] = { ...spell };

    // boss turn
    cast();
    if (boss.hp <= 0) {
      win = true;
      break;
    }
    player.hp -= Math.max(1, boss.dmg - player.def);
  }

  if (win && current < minMana) {
    minMana = current;
    console.log({ minMana });
  }

  if (win || lose) {
    if (Date.now() > (start + 400)) running = false;
    boss.hp = 55;
    boss.dmg = 8;
    player.hp = 50;
    player.mana = 500;
    player.def = 0;
    toCast = {};
    tmpCast = {};
    win = false;
    lose = false;
  }
}
