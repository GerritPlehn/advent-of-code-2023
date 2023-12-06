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

const inp = input;

const lines = inp.split("\n").slice(0, -1);
const lineWidth = lines[0].length;

type Rect = {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
};

type Point = {
  x: number;
  y: number;
};

const areAdjacent = (r: Rect, p: Point) => {
  for (const field of getFields({
    x0: r.x0 - 1,
    x1: r.x1 + 1,
    y0: r.y0 - 1,
    y1: r.y1 + 1,
  })) {
    if (field.x === p.x && field.y === p.y) return true;
  }
  return false;
};

const getFields = (r: Rect) => {
  const fields: (Point & { value: string })[] = [];
  for (let i = Math.max(0, r.y0); i <= Math.min(lines.length - 1, r.y1); i++) {
    for (let j = Math.max(0, r.x0); j <= Math.min(lineWidth - 1, r.x1); j++) {
      fields.push({ x: j, y: i, value: lines[i][j] });
    }
  }
  return fields;
};

class PartNumber {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  number: number;
  get length() {
    return this.x1 - this.x0;
  }
  get fileIndex() {
    return lineWidth * this.y0 + this.x0;
  }

  isAdjacentTo(x: number, y: number) {
    const isAdjacent = areAdjacent(this, { x, y });
    if (isAdjacent) {
      console.log(this);
      console.log(`${this.number} adjacent to (${y},${x})`);
    }
    return isAdjacent;
  }

  constructor(props: { x0: number; x1: number; y: number; number: number }) {
    this.x0 = props.x0;
    this.x1 = props.x1;
    this.y0 = props.y;
    this.y1 = props.y;
    this.number = props.number;
  }
}

const partNumbers = [];

for (let i = 0; i < lines.length; i++) {
  const matches = lines[i].matchAll(/[0-9]+/g);
  for (const match of matches) {
    const number = Number(match[0]);
    const x0 = Math.max(0, match.index);
    const x1 = Math.min(lineWidth, match.index + match[0].length - 1);
    partNumbers.push(new PartNumber({ number, x0, x1, y: i }));
  }
}

const gears = [];
for (let i = 0; i < lines.length; i++) {
  for (const match of lines[i].matchAll(/\*/g)) {
    const adjacentNumbers = [];
    for (const number of partNumbers) {
      if (number.isAdjacentTo(match.index, i)) adjacentNumbers.push(number);
    }
    if (adjacentNumbers.length === 2) {
      gears.push({
        x: match.index,
        y: i,
        adjacentNumbers,
        gearing: adjacentNumbers.reduce((p, c) => {
          return p * c.number;
        }, 1),
      });
    }
  }
}

const gearRatioSum = gears.reduce((sum, gear) => (sum += gear.gearing), 0);

console.log(gears);
console.log(gearRatioSum);
