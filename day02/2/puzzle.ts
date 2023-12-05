import { readFile } from "fs/promises";

const input = (await readFile("./day02/input.txt")).toString();

const lines = input.split("\n").slice(0, -1);

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

let powerSum = 0;

for (const line of lines) {
  const colonSplit = line.split(":");
  const gameId = Number(colonSplit.at(0)?.split(" ").at(-1));
  const drawSection = colonSplit.at(1)?.split(";");
  // console.log(gameId);
  const draws = drawSection
    ?.map((gameSection) =>
      gameSection.split(",").map((color) => color.trim().split(" "))
    )
    .map((draw) => {
      const a = { red: 0, green: 0, blue: 0 };
      for (let i = 0; i < draw.length; i++) {
        a[draw[i][1]] = Number(draw[i][0]);
      }
      return a;
    });

  const minSet = draws?.reduce(
    (previous, current) => {
      return {
        red: Math.max(previous.red, current.red),
        green: Math.max(previous.green, current.green),
        blue: Math.max(previous.blue, current.blue),
      };
    },
    { red: -Infinity, green: -Infinity, blue: -Infinity }
  );
  const power = minSet.red * minSet?.green * minSet?.blue;
  console.log(
    `Game ${gameId}: r${minSet.red} g${minSet.green} b${minSet.blue} p${power}`
  );
  powerSum += power;
}

console.log(powerSum);
