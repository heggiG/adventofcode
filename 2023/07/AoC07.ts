import fs from "fs";
import readline from "readline";

const count = (arr: number[], val: number): number => {
    return [...arr].filter(x => x === val).length
}

interface Hand {
    cards: number[],
    handType: number;
}

const sort = (a: Hand, b: Hand): number => {
    if (a.handType !== b.handType) {
        return b.handType - a.handType
    } else {
        for (let i = 0; i < a.cards.length; i++) {
            if (b.cards[i] !== a.cards[i]) {
                if (a.cards[i] > b.cards[i]) {
                    return 1;
                } else {
                    return -1;
                }
            }
        }
        return 0;
    }
}

const convertToNumbers = (a: string): Hand => {
    const result: number[] = [];
    for (let y of a) {
        if (/\d/.test(y)) {
            result.push(Number(y));
        } else {
            switch (y) {
                case 'T':
                    result.push(11);
                    break;
                case 'J':
                    result.push(1);
                    break;
                case 'Q':
                    result.push(13);
                    break;
                case 'K':
                    result.push(14);
                    break;
                case 'A':
                    result.push(15);
                    break;
                default: break;
            }
        }
    }
    let hand: Hand = { cards: [...result], handType: -1 };
    let set = [...new Set(result)];
    let jCount = count(result, 1)
    if (set.length === 1) {
        hand.handType = 0;
    } else if (set.length === 5) {
        hand.handType = 6;
        if (jCount === 1) {
            hand.handType = 5;
        }
    } else if (set.length === 4) {
        hand.handType = 5;
        if (jCount === 1) {
            hand.handType = 3
        } else if (jCount === 2) {
            hand.handType = 3;
        }
    } else if (set.length === 2) {
        if (count(result, set[0]) === 4 || count(result, set[1]) === 4) {
            hand.handType = 1;
            if (jCount === 1 || jCount === 4) {
                hand.handType = 0;
            }
        } else {
            hand.handType = 2
            if (jCount > 0) {
                hand.handType = 0;
            }
        }
    } else if (set.length === 3) {
        if (count(result, set[0]) === 3 || count(result, set[1]) === 3 || count(result, set[2]) === 3) {
            hand.handType = 3;
            if (jCount == 1) {
                hand.handType = 1;
            } else if (jCount === 3) {
                hand.handType = 1;
            } else if (jCount === 2) {
                hand.handType = 0;
            }
        } else {
            hand.handType = 4
            if (jCount == 1) {
                if (result.indexOf(0) == 4) {
                    hand.handType = 2;
                } else {
                    hand.handType = 2
                }
            } else if (jCount == 2) {
                hand.handType = 1;
            }
        }
    }
    return hand;
}

interface AllHands {
    hand: Hand;
    bet: number;
}

const func = async () => {
    const stream = fs.createReadStream("GameInput.txt");
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    let result: AllHands[] = [];
    for await (let line of rl) {
        let split = line.split(' ');
        result.push({ hand: convertToNumbers(split[0]), bet: Number(split[1]) })
    }

    result.sort((a, b) => sort(a.hand, b.hand));
    fs.rmSync('Result.txt')
    for (let x of result) {
        fs.appendFileSync('Result.txt', JSON.stringify(x) + '\n');
    }

    let sum = 0;

    for (let i = 0; i < result.length; i++) {
        sum += result[i].bet * (i + 1)
    }

    console.log(sum)
}


func();
