import { readFile } from "fs/promises";

const input = (await readFile("./day01/input.txt")).toString();

const lines = input.split("\n");

// lol, I got a bit carried away on this one.
// learnings: "twone".matchAll(/one|two/g) does only match "two", since regex "consumes" the match by default
// one has to use a positive lookahed to disable this behavior

const numberStrings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const numberRegex = /(?=([1-9]|one|two|three|four|five|six|seven|eight|nine))/g;
let sum = 0;
for (let i = 0; i < lines.length; i++) {
  const rowNumbers = [];
  const matches = [...lines[i].matchAll(numberRegex)];
  const relevantNumbers = [matches.at(0), matches.at(-1)];
  for (let j = 0; j < relevantNumbers.length; j++) {
    const numberString = relevantNumbers[j]?.[1];
    if (numberString?.length === 1) {
      rowNumbers[j] = (j ? 1 : 10) * Number(numberString);
    } else {
      rowNumbers[j] = (j ? 1 : 10) * (numberStrings.indexOf(numberString!) + 1);
    }
  }
  console.log(rowNumbers[0] + rowNumbers[1]);
  sum += rowNumbers[0] + rowNumbers[1];
}

console.log(sum);
