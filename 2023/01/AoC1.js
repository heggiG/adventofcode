const fs = require('fs');
const readline = require('readline')

let numberNameMap = new Map()
const numberRegex = /(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g

const func = async () => {
    const stream = fs.createReadStream('Aufgabe1Data.txt');
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    let sum = 0;
    for await (let line of rl) {
        while (numberRegex.test(line)) {
            line = line.replace(numberRegex, val => val[0] + numberNameMap.get(val) + val[val.length - 1])
        }
        const digits = line.split('').filter(char => !isNaN(char)).map(dig => parseInt(dig, 10));
        const number = parseInt('' + digits[0] + '' + digits[digits.length - 1], 10);
        sum += number
    }
    console.log(sum)
}

const setupMap = () => {
    numberNameMap.set('one', 1);
    numberNameMap.set('two', 2);
    numberNameMap.set('three', 3);
    numberNameMap.set('four', 4);
    numberNameMap.set('five', 5);
    numberNameMap.set('six', 6);
    numberNameMap.set('seven', 7);
    numberNameMap.set('eight', 8);
    numberNameMap.set('nine', 9);
}


setupMap();
func();

