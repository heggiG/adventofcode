'use strict';

const fs = require('fs')
const readline = require('readline')


const func = async() => {

    const clamp = (num, low, hi) => {
        if (num < low) {
            return low;
        }
        if (num > hi) {
            return hi;
        }
        return num;
    }

    const checkParameter = (arr, row, col, length) => {
        for (let x = -1; x <= length; x++) {
            for (let y = -1; y < 2; y++) {
                if (!/[0-9.]/.test(arr[clamp(row + x, 0, arr[0].length)][clamp(col + y, 0, arr.length)])) {
                    return true;
                }
            }
        }
        return false;
    }

    const stream = fs.createReadStream('GameInput.txt');
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    let arr = [];

    for await (let line of rl) {
        arr.push(line.split(''));
    }

    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[0].length; col++) {

        }
    }

}

func();