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

const processCard = (lineIndex: number) => {
  const [cardInfo, numberSection] = lines[lineIndex].split(": ");
  const [winningNumberString, ourNumberString] = numberSection.split(" | ");
  const ourNumbers = numberStringProcessor(ourNumberString);
  const winningNumbers = numberStringProcessor(winningNumberString);

  const winNumberHits = [];

  for (const winningNumber of winningNumbers) {
    if (ourNumbers.includes(winningNumber)) {
      winNumberHits.push(winningNumber);
    }
  }
  return winNumberHits.length;
};

const cardScores: number[] = [];

for (let i = 0; i < lines.length; i++) {
  cardScores.push(processCard(i));
}

const getCardScore = (cardId: number) => {
  const selfScore = cardScores[cardId];

  let childScores = 0;
  for (let copy = 1; copy <= selfScore; copy++) {
    childScores += getCardScore(cardId + copy);
  }
  return selfScore + childScores;
};

let cardSum = lines.length;
for (let i = 0; i < cardScores.length; i++) {
  cardSum += getCardScore(i);
}

console.log(cardSum);

debugger;
