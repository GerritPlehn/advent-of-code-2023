import { readFile } from "fs/promises";

const input = (await readFile("./day01/input.txt")).toString();

const lines = input.split("\n");

let sum = 0;
for (let i = 0; i < lines.length; i++) {
  let firstLineNumber;
  let lastLineNumber;
  const lineLenght = lines[i].length - 1;

  line: for (let j = 0; j <= lineLenght; j++) {
    if (!firstLineNumber) {
      const charToNumber = Number(lines[i][j]);
      if (!Number.isNaN(charToNumber)) {
        firstLineNumber = charToNumber;
        sum += 10 * firstLineNumber;
      }
    }
    if (!lastLineNumber) {
      const charToNumber = Number(lines[i][lineLenght - j]);
      if (!Number.isNaN(charToNumber)) {
        lastLineNumber = charToNumber;
        sum += lastLineNumber;
      }
    }
    if (firstLineNumber && lastLineNumber) {
      console.log(firstLineNumber, lastLineNumber);
      break line;
    }
  }
}

console.log(sum);
