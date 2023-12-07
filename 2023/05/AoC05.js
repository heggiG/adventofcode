const fs = require('fs');
const readline = require('readline')




const setupMap = async (fileName) => {
    const stream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    let map = [];

    for await (let line of rl) {
        map.push(line.split(' ').map(Number));
    }

    return map;
}

const getInput = async () => {
    const stream = fs.createReadStream('GameInput.txt');
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })
    for await (let line of rl) {
        return line.split(' ').map(val => +val);
    }
}

const between = (num, lo, hi) => {
    return num >= lo && num <= hi;
}

const getNextValue = (num, map) => {
    for (let arr of map) {
        if (between(num, arr[1], arr[1] + arr[2] - 1)) {
            let diff = num - arr[1];
            return arr[0] + diff;
        }
    }
    return num;
}

const func = async () => {
    const seedToSoil = await setupMap('seedtosoil.txt');
    const soilToFert = await setupMap('soiltofert.txt');
    const fertToWater = await setupMap('ferttowater.txt');
    const waterToLight = await setupMap('watertolight.txt');
    const lightToTemp = await setupMap('lighttotemp.txt');
    const tempToHumid = await setupMap('temptohumid.txt');
    const humidToLocation = await setupMap('humidtolocation.txt')

    const mappings = [seedToSoil, soilToFert, fertToWater, waterToLight, lightToTemp, tempToHumid, humidToLocation];

    const gameValues = await getInput();
    let lo = Infinity

    for (let i = 0; i < gameValues.length; i += 2) {
        console.log(i)
        for (let num = gameValues[i]; num < (gameValues[i] + gameValues[i + 1]); num += 1) {
            let mut = num;
            for (let map of mappings) {
                mut = getNextValue(mut, map);
            }
            lo = mut < lo ? mut : lo
        }
    }
    console.log(lo)
}


func();

