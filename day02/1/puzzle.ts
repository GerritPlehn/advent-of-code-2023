import { readFile } from "fs/promises";

const input = (await readFile("./day02/input.txt")).toString();

const lines = input.split("\n");

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

let possibleGameIdSum = 0;

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

  if (
    draws?.some(
      (draw) =>
        draw.red > availableCubes.red ||
        draw.green > availableCubes.green ||
        draw.blue > availableCubes.blue
    )
  ) {
    console.log(gameId + " impossible");
    continue;
  }
  console.log(gameId + " possible");
  possibleGameIdSum += gameId;
}

console.log(possibleGameIdSum);
