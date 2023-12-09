const fs = require("fs");
const readline = require("readline");

const func = async () => {
    const stream = fs.createReadStream("GameInput.txt");
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    let sum = 0;

    for await (let line of rl) {
        let curr = line.split(" ").map(Number);
        sum += calcNextNumber(curr);
    }

    console.log(sum);
};

const calcNextNumber = (arr) => {
    console.log(arr);
    if (arr.every((val) => val === 0)) {
        return 0;
    }
    let next = [];
    for (let i = 0; i < arr.length - 1; i++) {
        next.push(arr[i + 1] - arr[i]);
    }
    return -calcNextNumber(next) + arr[0];
};

func();
