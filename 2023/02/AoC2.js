const fs = require('fs')
const readline = require('readline')


const func = async() => {
    const stream = fs.createReadStream('GameInput.txt');
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    const redCubes = 12;
    const greenCubes = 13;
    const blueCubes = 14;
    const redReg = /(\d+) red/
    const greenReg = /(\d+) green/
    const blueReg = /(\d+) blue/

    let sum = 0;
    let test = 0;
    for await (let line of rl) {
        let gameId = Number(/Game (\d+): /.exec(line)[1]);
        test += gameId;
        let game = line.split(': ')[1];

        let fewestRed = 1;
        let fewestGreen = 1;
        let fewestBlue = 1;

        for (let round of game.split(';')) {
            let red = redReg.exec(round);
            if (red && Number(red[1]) > fewestRed) {
                fewestRed = Number(red[1]);
            }
            let green = greenReg.exec(round);
            if (green && Number(green[1]) > fewestGreen) {
                fewestGreen = Number(green[1])
            }
            let blue = blueReg.exec(round);
            if (blue && Number(blue[1]) > fewestBlue) {
                fewestBlue = Number(blue[1]);
            }
        }
        sum += fewestRed * fewestGreen * fewestBlue;
    }
    console.log(sum)

}

func()