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

function part1Reduce(): number {
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
    const countPositiveBits = (input: string[], index: number) => {
        let bitCount = 0;
        input.forEach(sequence => {
            const bit = sequence.charAt(index);
            if (bit === "1") bitCount++;
        });
        return bitCount;
    };

    const oxygenRating = (input: string[], index: number): string => {
        const postiveBitCount = countPositiveBits(input, index);
        let keep = postiveBitCount >= input.length / 2 ? "1" : "0";
        const newInput = input.filter(value => value.charAt(index) === keep);

        if (newInput.length === 1) return newInput[0];
        return oxygenRating(newInput, index + 1);
    };
    const co2Rating = (input: string[], index: number): string => {
        const postiveBitCount = countPositiveBits(input, index);
        let keep = postiveBitCount >= input.length / 2 ? "0" : "1";

        const newInput = input.filter(value => value.charAt(index) === keep);

        if (newInput.length === 1) return newInput[0];

        return co2Rating(newInput, index + 1);
    };
    return parseInt(oxygenRating(fileLines, 0), 2) * parseInt(co2Rating(fileLines, 0), 2);
}


console.log("Outcome day 3 part 1:", part1());
console.log("Outcome day 3 part 1 (with reduce):", part1Reduce());
console.log("Outcome day 3 part 2:", part2());
