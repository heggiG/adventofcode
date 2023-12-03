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
        for (let x = -1; x <= length; x++) {
            for (let y = -1; y < 2; y++) {
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

    for await (let line of rl) {
        arr.push(line.split(""));
    }

    let found = false;
    let length = 0;
    let number = "";
    let sum = 0;
    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[0].length; col++) {
            if (/[0-9]/.test(arr[row][col])) {
                number += "" + arr[row][col];
                found = true;
                length++;
            }
            if (found && !/[0-9]/.test(arr[row][col])) {
                if (checkPerimeter(arr, row, col, length)) {
                    console.log(Number(number));
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
