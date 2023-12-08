"use strict";

const fs = require("fs");
const readline = require("readline");

const func = async () => {
    const clamp = (num, low, hi) => {
        if (num < low) {
            return low;
        }
        if (num > hi) {
            return hi;
        }
        return num;
    };

    const checkPerimeter = (arr, row, col, length) => {
        let results = []
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y <= length; y++) {
                if (arr[clamp(row + x, 0, arr.length - 1)][clamp(col + y, 0, arr[0].length - 1)] === '*') {
                    results.push({ x: clamp(row + x, 0, arr.length - 1), y: clamp(col + y, 0, arr[0].length - 1) });
                }
            }
        }
        return results;
    };

    const stream = fs.createReadStream("GameInput.txt");
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    let arr = [];

    for await (let line of rl) {
        arr.push(line.split(""));
    }

    let found = false;
    let length = 0;
    let number = "";
    let sum = 0;

    let map = new Map();

    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[0].length; col++) {
            if (/[0-9]/.test(arr[row][col])) {
                number += "" + arr[row][col];
                found = true;
                length++;
            }
            if (found && (!/[0-9]/.test(arr[row][col]) || col > arr[0].length)) {
                if (+number === 795) console.log('ABCV')
                let stars
                if ((stars = checkPerimeter(arr, row, col - (length), length)).length > 0) {
                    if (+number === 795) console.log('ABCV')
                    for (let star of stars) {
                        if (!map.has(toKey(star.x, star.y))) {
                            map.set(toKey(star.x, star.y), [])
                        }
                        map.get(toKey(star.x, star.y)).push(+number)
                    }
                }
                found = false;
                number = "";
                length = 0;
            }
        }
    }


    for (let val of map.values()) {
        if (val.length == 2) {
            sum += val[0] * val[1];
        }
    }

    console.log(sum)
};

const toKey = (x, y) => {
    return '' + x + ',' + y;
}

func();