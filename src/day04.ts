import { readFileSync } from 'fs';

const fileLines = readFileSync('./input/day04.txt', 'utf-8').split("\n\n");
const drawingSequence = fileLines[0].split(',');
const boards = fileLines.slice(1).map(boardStr => boardStr.split('\n').map(line => line.split(' ').filter(cell => cell !== '')));


function part1(): number {
    return 0;
}

function part2(): number {
    return 0;
}

console.log("Outcome day 4 part 1:", part1());
console.log("Outcome day 4 part 2:", part2());
