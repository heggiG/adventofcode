const fs = require('fs');
const readline = require('readline')


const func = async() => {
    const stream = fs.createReadStream('GameInput.txt');
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })
    
}