import { readFile } from "fs/promises";

const input = (await readFile("./day04/input.txt")).toString();

const sample =
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\n" +
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\n" +
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\n" +
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\n" +
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\n" +
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11\n";

console.log(sample);

const inp = input;

const lines = inp.split("\n").slice(0, -1);

const numberStringProcessor = (numberString: string) => {
  return numberString
    .replaceAll("  ", " ")
    .trim()
    .split(" ")
    .map((numberString) => Number(numberString));
};

let pointSum = 0;

for (let i = 0; i < lines.length; i++) {
  const [cardInfo, numberSection] = lines[i].split(": ");
  const [winningNumberString, ourNumberString] = numberSection.split(" | ");
  const ourNumbers = numberStringProcessor(ourNumberString);
  const winningNumbers = numberStringProcessor(winningNumberString);

  const winNumberHits = [];

  if (winningNumbers.length > 10) debugger;
  for (const winningNumber of winningNumbers) {
    if (ourNumbers.includes(winningNumber)) {
      winNumberHits.push(winningNumber);
    }
  }

  const points =
    winNumberHits.length === 0 ? 0 : Math.pow(2, winNumberHits.length - 1);
  console.log(`${cardInfo}: ${winNumberHits} (${points} points)`);
  pointSum += points;
}

console.log(pointSum);
