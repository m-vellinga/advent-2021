import { readFileSync } from 'fs';

const fileLines = readFileSync('./input/day03.txt', 'utf-8').split('\n');


function part1(): number {
    const sumPerColumn = new Proxy([], {
        get: (target: number[], index: any) => index in target ? target[index] : 0
    });
    fileLines.forEach(sequence => {
        [...sequence].forEach((bit, index) => {
            sumPerColumn[index] += parseInt(bit);
        });
    });

    const mostCommon = fileLines.length / 2;
    let gammaRate = "";
    let epsilonRate = "";
    sumPerColumn.forEach(sum => {
        const moreZeroes = sum < mostCommon;
        gammaRate += moreZeroes ? "0" : "1";
        epsilonRate += moreZeroes ? "1" : "0";
    });

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function part1_reduce(): number {
    // This is actually faster than vanilla loops, huh.
    const sumPerColumn = new Proxy([], {
        get: (target: number[], index: any) => index in target ? target[index] : 0
    });
    fileLines.forEach(sequence => {
        [...sequence].forEach((bit, index) => {
            sumPerColumn[index] += parseInt(bit);
        });
    });

    const mostCommon = fileLines.length / 2;
    const gammaRate = sumPerColumn.reduce((rateString, sum) => rateString + (sum < mostCommon ? "0" : "1"), '');
    const epsilonRate = [...gammaRate].reduce((rateString, bit) => rateString + (1 - +bit).toString(), '');

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}



function part2(): number {
    return 0;
}

let s1 = performance.now();
console.log("Outcome day 3 part 1:", part1());
let e1 = performance.now();
console.log(`Vanilla loops took ${e1 - s1} milliseconds`);

let s2 = performance.now();
console.log("Outcome day 3 part 1:", part1_reduce());
let e2 = performance.now();
console.log(`Reduce took ${e2 - s2} milliseconds`);

console.log("Outcome day 3 part 2:", part2());
