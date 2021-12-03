import { readFileSync } from 'fs';

const fileLines = readFileSync('./input/day01.txt', 'utf-8').split('\n');
const measurements = fileLines.map(val => +val);

function part1(): number {
    let increasedCount = 0;
    for (let i = 1; i < measurements.length; i++) {
        if (measurements[i] > measurements[i - 1]) increasedCount++;
    }
    return increasedCount;
}

function part2(): number {
    const sum = (a: number, b: number) => a + b;

    let increasedWindowCount = 0;
    let previousWindow = measurements.slice(0, 3).reduce(sum);
    for (let i = 1; i < measurements.length - 2; i++) {
        let currentWindow = measurements.slice(i, i + 3).reduce(sum);
        if (currentWindow > previousWindow) increasedWindowCount++;
        previousWindow = currentWindow;
    }
    return increasedWindowCount;
}

console.log("Outcome day 1 part 1:", part1());
console.log("Outcome day 1 part 2:", part2());
