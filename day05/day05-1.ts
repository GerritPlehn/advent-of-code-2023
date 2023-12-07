import { readFile } from "fs/promises";

const input = (await readFile("./day05/input.txt")).toString();

const sample =
  "seeds: 79 14 55 13\n" +
  "\n" +
  "seed-to-soil map:\n" +
  "50 98 2\n" +
  "52 50 48\n" +
  "\n" +
  "soil-to-fertilizer map:\n" +
  "0 15 37\n" +
  "37 52 2\n" +
  "39 0 15\n" +
  "\n" +
  "fertilizer-to-water map:\n" +
  "49 53 8\n" +
  "0 11 42\n" +
  "42 0 7\n" +
  "57 7 4\n" +
  "\n" +
  "water-to-light map:\n" +
  "88 18 7\n" +
  "18 25 70\n" +
  "\n" +
  "light-to-temperature map:\n" +
  "45 77 23\n" +
  "81 45 19\n" +
  "68 64 13\n" +
  "\n" +
  "temperature-to-humidity map:\n" +
  "0 69 1\n" +
  "1 0 69\n" +
  "\n" +
  "humidity-to-location map:\n" +
  "60 56 37\n" +
  "56 93 4\n";

const inp = input;

const lines = inp.split("\n\n");

const parseSection = (sectionString: string) => {
  return sectionString
    .split("\n")
    .slice(1)
    .map((row) => row.split(" ").map((n) => Number(n)));
};

const seeds = lines[0]
  .slice(7)
  .split(" ")
  .map((n) => Number(n));

const seedToSoil = parseSection(lines[1]);
const soilToFertilizer = parseSection(lines[2]);
const fertilizerToWater = parseSection(lines[3]);
const waterToLight = parseSection(lines[4]);
const lightToTemperature = parseSection(lines[5]);
const temperatureToHumidity = parseSection(lines[6]);
const humidityToLocation = parseSection(lines[7]);

const mapLookup = (ids: number[], map: number[][]) => {
  const outIds: number[] = [];
  for (const id of ids) {
    let found = false;
    for (const mapLine of map) {
      const destinationRangeStart = mapLine[0];
      const sourceRangeStart = mapLine[1];
      const rangeLenght = mapLine[2];

      if (id >= sourceRangeStart && id < sourceRangeStart + rangeLenght) {
        outIds.push(destinationRangeStart + id - sourceRangeStart);
        found = true;
      }
    }
    if (!found) outIds.push(id);
  }
  return outIds;
};

const soils = mapLookup(seeds, seedToSoil);
const fertilizer = mapLookup(soils, soilToFertilizer);
const water = mapLookup(fertilizer, fertilizerToWater);
const light = mapLookup(water, waterToLight);
const temperature = mapLookup(light, lightToTemperature);
const humidity = mapLookup(temperature, temperatureToHumidity);
const location = mapLookup(humidity, humidityToLocation);

console.log(Math.min(...location));
