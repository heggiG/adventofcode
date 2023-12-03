"use strict";

const fs = require("fs");
const readline = require("readline");

const func = async() => {
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
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y <= length; y++) {
                console.log(clamp(row + x, 0, arr.length - 1), clamp(col + y, 0, arr[0].length - 1))
                if (!/[0-9.]/.test(arr[clamp(row + x, 0, arr.length - 1)][clamp(col + y, 0, arr[0].length - 1)])) {
                    return true;
                }
            }
        }
        return false;
    };

    const stream = fs.createReadStream("GameInput.txt");
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    let arr = [];
    let test = [
        ['.', '.', '.', '.', '.'],
        ['.', '1', '2', '2', '.'],
        ['.', '.', '*', '.', '.']
    ]

    for await (let line of rl) {
        arr.push(line.split(""));
    }

    let found = false;
    let length = 0;
    let number = "";
    let sum = 0;
    for (let row = 0; row < test.length; row++) {
        for (let col = 0; col < test[0].length; col++) {
            if (/[0-9]/.test(test[row][col])) {
                number += "" + test[row][col];
                found = true;
                length++;
            }
            if (found && !/[0-9]/.test(test[row][col])) {
                if (checkPerimeter(test, row, col - (length), length)) {
                    sum += Number(number);
                }
                found = false;
                number = "";
                length = 0;
            }
        }
    }

    console.log(sum);
};

func();