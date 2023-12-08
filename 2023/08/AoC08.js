const fs = require('fs');
const { traceDeprecation } = require('process');
const readline = require('readline')


const setUpTree = (input) => {
    let map = new Map();
    for (let s of input) {
        let res = /(.{3}) = \((.{3}, .{3})\)/g.exec(s);
        let name = res[1];
        let then = res[2];
        map.set(name, then);
    }
    return map;
}

const walkTree = (start, end, instructions, map) => {
    let steps = 0;
    let current = map.get(start);
    while (true) {
        for (let ins of instructions) {
            let next = current.split(', ')
            if (ins === 'L') {
                if (next[0] === end) {
                    return steps + 1;
                }
                current = map.get(next[0]);
            } else {
                if (next[1] === end) {
                    return steps + 1;
                }
                current = map.get(next[1]);
            }
            steps++;
        }
    }
}

const func = async () => {
    const stream = fs.createReadStream('GameInput.txt');
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    let instructions;
    let treeInput = [];

    for await (let line of rl) {
        if (line.startsWith('LRL')) {
            instructions = line.split('');
            continue;
        }
        if (line == '') {
            continue;
        }
        treeInput.push(line);
    }
    console.log(treeInput.filter(val => val.includes('LJF')))

    let tree = setUpTree(treeInput);
    console.log(walkTree('AAA', 'ZZZ', instructions, tree));

}

func();

