import { readFileSync } from 'fs';

const nearbyFishDaysLeft = readFileSync('./input/day06.txt', 'utf-8').split(',').map(val => +val);


function part1(): number {
    const fishDayCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    nearbyFishDaysLeft.forEach(value => fishDayCount[value]++);
    for (let i = 1; i <= 80; i++) {
        const gaveBirth = fishDayCount.shift()!;
        fishDayCount[6] += gaveBirth;
        fishDayCount[8] = gaveBirth;
    }
    return fishDayCount.reduce((a, b) => a + b);
}

function part2(): number {
    const fishDayCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    nearbyFishDaysLeft.forEach(value => fishDayCount[value]++);
    for (let i = 1; i <= 256; i++) {
        const gaveBirth = fishDayCount.shift()!;
        fishDayCount[6] += gaveBirth;
        fishDayCount[8] = gaveBirth;
    }
    return fishDayCount.reduce((a, b) => a + b);
}

console.log("Outcome day 6 part 1:", part1());
console.log("Outcome day 6 part 2:", part2());
