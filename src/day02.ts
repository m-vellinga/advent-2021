import { readFileSync } from 'fs';

const fileLines = readFileSync('./input/day02.txt', 'utf-8').split('\n');

function part1(): number {
    let depth = 0;
    let horizontal = 0;
    fileLines.forEach(element => {
        const parts = element.split(' ');
        const action = parts[0];
        const amount = +parts[1];

        switch (action) {
            case 'forward':
                horizontal += amount;
                break;
            case 'up':
                depth -= amount;
                break;
            case 'down':
                depth += amount;
                break;
        }
    });
    return depth * horizontal;
}

function part2(): number {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;
    fileLines.forEach(element => {
        const parts = element.split(' ');
        const action = parts[0];
        const amount = +parts[1];

        switch (action) {
            case 'forward':
                horizontal += amount;
                depth += amount * aim;
                break;
            case 'up':
                aim -= amount;
                break;
            case 'down':
                aim += amount;
                break;
        }
    });
    return depth * horizontal;
}

console.log("Outcome day 2 part 1:", part1());
console.log("Outcome day 2 part 2:", part2());
