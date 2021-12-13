import { readFileSync } from 'fs';

const fileLines = readFileSync('./input/day10.txt', 'utf-8').split("\n");

const scoreTable = new Map<string, number>([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137],
]);
const charMapping = new Map<string, string>([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>'],
]);

function part1(): number {
    const illegalCharCount = new Map<string, number>([
        [')', 0],
        [']', 0],
        ['}', 0],
        ['>', 0],
    ]);
    fileLines.forEach(line => {
        let openingSequence = [];
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if ([...charMapping.keys()].includes(char)) {
                openingSequence.push(char);
            } else {
                const firstToClose = openingSequence.pop()!;
                if (char !== charMapping.get(firstToClose)) {
                    illegalCharCount.set(char, (illegalCharCount.get(char) ?? 0) + 1);
                    break;
                }
            }
        }
    });
    return [...illegalCharCount.entries()].reduce((prev, [char, count]) => prev + count * (scoreTable.get(char) ?? 0), 0);
}

function isCorrupted(line: string): boolean {
    let openingSequence = [];
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if ([...charMapping.keys()].includes(char)) {
            openingSequence.push(char);
        } else {
            const firstToClose = openingSequence.pop()!;
            if (char !== charMapping.get(firstToClose)) {
                return true;
            }
        }
    }
    return false;
}

const scoreTable2 = new Map<string, number>([
    ['(', 1],
    ['[', 2],
    ['{', 3],
    ['<', 4],
]);


function part2(): number {
    let incompleteLines = fileLines.filter(val => !isCorrupted(val));
    let scores: number[] = [];
    incompleteLines.forEach(line => {
        let charsNotClosed: string[] = [];
        [...line].forEach(char => [...charMapping.keys()].includes(char) ? charsNotClosed.push(char) : charsNotClosed.pop());
        scores.push(charsNotClosed.reverse().reduce((prev, curr) => prev * 5 + (scoreTable2.get(curr) ?? 0), 0));
    });
    scores.sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
}

console.log("Outcome day 10 part 1:", part1());
console.log("Outcome day 10 part 2:", part2());
