import { readFileSync } from 'fs';

const nearbyFishDaysLeft = readFileSync('./input/day06.txt', 'utf-8').split(',').map(val => +val);


function run(days: number): number {
    const fishDayCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    nearbyFishDaysLeft.forEach(value => fishDayCount[value]++);
    for (let i = 1; i <= days; i++) {
        const gaveBirth = fishDayCount.shift()!;
        fishDayCount[6] += gaveBirth;
        fishDayCount[8] = gaveBirth;
    }
    return fishDayCount.reduce((a, b) => a + b);
}

function part1(): number {
    return run(80);
}

function part2(): number {
    return run(256);
}

console.log("Outcome day 6 part 1:", part1());
console.log("Outcome day 6 part 2:", part2());
