import { readFileSync } from 'fs';

const fileLines = readFileSync('./input/day07.txt', 'utf-8').split(',').map(v => +v);


function part1(): number {
    // Source https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/median.md
    const determineMedian = (arr: number[]) => {
        const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    const median = determineMedian(fileLines);

    return fileLines.reduce((previous, current) => previous + Math.abs(current - median), 0);
}

function part2(): number {
    const maxPosition = Math.max(...fileLines);
    let fuelConsumption = Infinity;
    for (let position = 0; position <= maxPosition; position++) {
        const fuelNeeded = fileLines.reduce((previous, currentPosition) => {
            const stepsToPosition = Math.abs(currentPosition - position);
            return previous + (stepsToPosition * (stepsToPosition + 1) / 2);
        }, 0);
        if (fuelNeeded < fuelConsumption) fuelConsumption = fuelNeeded;
        if (fuelNeeded == 98039527) console.log(position);
    }
    return fuelConsumption;
}

console.log("Outcome day 7 part 1:", part1());
console.log("Outcome day 7 part 2:", part2());
