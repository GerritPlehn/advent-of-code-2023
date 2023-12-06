import { readFile } from "fs/promises";

const input = (await readFile("./day03/input.txt")).toString();

const sample =
  "467..114..\n" +
  "...*......\n" +
  "..35..633.\n" +
  "......#...\n" +
  "617*......\n" +
  ".....+.58.\n" +
  "..592.....\n" +
  "......755.\n" +
  "...$.*....\n" +
  ".664.598..\n";

console.log(sample);

const inp = input;

const lines = inp.split("\n").slice(0, -1);
const lineWidth = lines[0].length;

let partNumberSum = 0;

for (let i = 0; i < lines.length; i++) {
  const matches = [...lines[i].matchAll(/[0-9]+/g)];
  for (const match of matches) {
    const number = Number(match[0]);
    const minX = Math.max(0, match.index - 1);
    const maxX = Math.min(lineWidth, match.index + match[0].length + 1);
    const adjacentCharacters =
      lines[Math.max(0, i - 1)].slice(
        // line above
        minX,
        maxX
      ) +
      lines[i].slice(
        // same line
        minX,
        maxX
      ) +
      lines[Math.min(i + 1, lines.length - 1)].slice(
        // line below
        minX,
        maxX
      );
    console.log(`number: ${number} ${adjacentCharacters}`);
    if (!adjacentCharacters.replaceAll(/[0-9\.]/g, "").length) {
      console.log("non part number");
      continue;
    }
    partNumberSum += number;
  }
}

console.log(`calculated: ${partNumberSum}, should: 4361`);
