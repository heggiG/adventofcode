const fs = require('fs');
const readline = require('readline')


const func = async() => {
    const stream = fs.createReadStream('GameInput.txt');
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })


    let x = [];

    for await (let line of rl) {
        let hits = 0;
        let play = line.split(': ')[1];
        let [winningNumbers, playingNumbers] = play.split(' | ');
        playingNumbers = playingNumbers.split(' ').map(Number).filter(n => n !== 0);
        winningNumbers = winningNumbers.split(' ').map(Number).filter(n => n !== 0);
        x.push({win: winningNumbers, play: playingNumbers, count: 1})
    }
    let index = 0;
    for (let obj of x) {
        let wins = 0;
        for (let num of obj.play) {
            if ((obj.win).includes(num)) {
                wins++;
            }
        }
        for (let y = 1; y <= wins; y++) {
            x[index + y < x.length ? index + y : x.length - 1].count += obj.count
            console.log(x[index + y < x.length ? index + y : x.length - 1].count)
        }
        index++
    }
    console.log(x)
    let sum = 0;
    for (let obj of x) {
        sum += obj.count
    }
    console.log(sum)
}

func();
