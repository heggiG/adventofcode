

const func = (values) => {
    
    let poss = 0;

    for (let timeAccelerated = 0; timeAccelerated < values[0]; timeAccelerated ++) {
        traveled = timeAccelerated * (values[0] - timeAccelerated);
        if (traveled > values[1]) {
            poss++;
        }
    }

    return poss;
}

let inputs = [[45977295, 305106211101695]]
console.time('exec')
console.log(inputs.map(func))
console.timeEnd('exec')

