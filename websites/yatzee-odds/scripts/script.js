let dice = [];
let calculateButton = document.querySelector("button");
let bestRollText = document.getElementById("best-roll-text");
let bestRollOdds = document.getElementById("best-roll-odds");
let nextBestRollText = document.getElementById("next-best-roll-text");
let nextBestRollOdds = document.getElementById("next-best-roll-odds");
let substring = '"1" : 0, "2" : 0, "3" : 0, "4" : 0, "5" : 0, "6" : 0';
let text = '{ "fiveOfAKind" : { ' + substring +
    '}, "fourOfAKind" : {' + substring + '}, "threeOfAKind" : {' + substring +
    '}, "lgStraight" : { "1" : 0, "2" : 0 }, "smStraight" : { "1" : 0, "2" : 0, "3" : 0 }, ' +
    '"fullHouse" : {"1" : {' + substring + '}, "2" : {' + substring + '}, "3" : {' + substring + '}, ' +
    '"4" : {' + substring + '}, "5" : {' + substring + '}, "6" : {' + substring + '}}}';
calculateButton.onclick = roll;
let odds = JSON.parse(text);
let highestOdds = ["Thing with highest odds", 0];
let sameOdds = [];

function roll() {
    let numGot = [];
    numGot.push(null); //So that 0 index isn't used
    numGot.push(document.getElementById('1s-check').checked);
    numGot.push(document.getElementById('2s-check').checked);
    numGot.push(document.getElementById('3s-check').checked);
    numGot.push(document.getElementById('4s-check').checked);
    numGot.push(document.getElementById('5s-check').checked);
    numGot.push(document.getElementById('6s-check').checked);
    let smStraightGot = document.getElementById('sm-straight-check').checked;
    let lgStraightGot = document.getElementById('lg-straight-check').checked;
    let threeOfAKindGot = document.getElementById('3-of-a-kind-check').checked;
    let fourOfAKindGot = document.getElementById('4-of-a-kind-check').checked;
    let yahtzeeGot = document.getElementById('yahtzee-check').checked;
    let fullHouseGot = document.getElementById('full-house-check').checked;

    //Update dice list
    for (let i = 0; i < 5; i++) {
        let num = parseInt(document.getElementById("dice" + (i+1)).value);
        if (!isNaN(num))
            dice[i] = num;
        else dice[i] = 0;
    }
    highestOdds = ["", 0];
    sameOdds = [];
    secondBestOdds = ["", 0];
    for (let i = 6; i > 0; i--) { //Start high, then go low
        odds.fiveOfAKind[i] = oddsOfX(5, i, dice);
        document.getElementById("yahtzee-odds-" + i).textContent = i + "'s: " + (odds.fiveOfAKind[i] * 100).toFixed(2) + "%";
        if (!(yahtzeeGot && numGot[i])) {
            if (odds.fiveOfAKind[i] !== 1 && odds.fiveOfAKind[i] > highestOdds[1]) {
                secondBestOdds[0] = highestOdds[0];
                secondBestOdds[1] = highestOdds[1];
                highestOdds[0] = "Yahtzee of " + i + "'s";
                highestOdds[1] = odds.fiveOfAKind[i];
                sameOdds = [];
            }
            else if (odds.fiveOfAKind[i] == highestOdds[1]) sameOdds.push("Yahtzee of " + i + "'s");
            else if (odds.fiveOfAKind[i] !== 1 && odds.fiveOfAKind[i] > secondBestOdds[1]) {
                secondBestOdds[0] = "Yahtzee of " + i + "'s";
                secondBestOdds[1] = odds.fiveOfAKind[i];
            }
        }

        odds.fourOfAKind[i] = oddsOfX(4, i, dice);
        document.getElementById("4-of-a-kind-odds-" + i).textContent = i + "'s: " + (odds.fourOfAKind[i] * 100).toFixed(2) + "%";
        // if (!(fourOfAKindGot && numGot[i])) {
        //     if (odds.fourOfAKind[i] !== 1 && odds.fourOfAKind[i] > highestOdds[1]) {
        //         secondBestOdds[0] = highestOdds[0];
        //         secondBestOdds[1] = highestOdds[1];
        //         highestOdds[0] = "4-of-a-kind of " + i + "'s";
        //         highestOdds[1] = odds.fourOfAKind[i];
        //         sameOdds = [];
        //     } else if (odds.fourOfAKind[i] == highestOdds[1]) sameOdds.push("4-of-a-kind of " + i + "'s");
        //     else if (odds.fourOfAKind[i] !== 1 && odds.fourOfAKind[i] > secondBestOdds[1]) {
        //         secondBestOdds[0] = "4-of-a-kind of " + i + "'s";
        //         secondBestOdds[1] = odds.fourOfAKind[i];
        //     }
        // }

        odds.threeOfAKind[i] = oddsOfX(3, i, dice);
        document.getElementById("3-of-a-kind-odds-" + i).textContent = i + "'s: " + (odds.threeOfAKind[i] * 100).toFixed(2) + "%";
        // if (!(threeOfAKindGot && numGot[i])) {
        //     if (odds.threeOfAKind[i] !== 1 && odds.threeOfAKind[i] > highestOdds[1]) {
        //         secondBestOdds[0] = highestOdds[0];
        //         secondBestOdds[1] = highestOdds[1];
        //         highestOdds[0] = "3-of-a-kind of " + i + "'s";
        //         highestOdds[1] = odds.threeOfAKind[i];
        //         sameOdds = [];
        //     } else if (odds.threeOfAKind[i] == highestOdds[1]) sameOdds.push("3-of-a-kind of " + i + "'s");
        //     else if (odds.threeOfAKind[i] !== 1 && odds.threeOfAKind[i] > secondBestOdds[1]) {
        //         secondBestOdds[0] = "3-of-a-kind of " + i + "'s";
        //         secondBestOdds[1] = odds.threeOfAKind[i];
        //     }
        // }

        if (i < 3) {
            odds.lgStraight[i] = oddsOfLargeStraight(i, dice);
            document.getElementById("lg-straight-odds-" + i).textContent = i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3) + "-" + (i+4) + ": " + (odds.lgStraight[i] * 100).toFixed(2) + "%";
            if (!(lgStraightGot)) {
                if (odds.lgStraight[i] !== 1 && odds.lgStraight[i] > highestOdds[1]) {
                    secondBestOdds[0] = highestOdds[0];
                    secondBestOdds[1] = highestOdds[1];
                    highestOdds[0] = "Large Straight of " + i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3) + "-" + (i+4);
                    highestOdds[1] = odds.lgStraight[i];
                    sameOdds = [];
                } else if (odds.lgStraight[i] == highestOdds[1]) sameOdds.push("Large Straight of " + i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3) + "-" + (i+4));
                else if (odds.lgStraight[i] !== 1 && odds.lgStraight[i] > secondBestOdds[1]) {
                    secondBestOdds[0] = "Large Straight of " + i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3) + "-" + (i+4);
                    secondBestOdds[1] = odds.lgStraight[i];
                }
            }
        }

        if (i < 4) {
            odds.smStraight[i] = oddsOfSmallStraight(i, dice);
            document.getElementById("sm-straight-odds-" + i).textContent = i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3) + ": " + (odds.smStraight[i] * 100).toFixed(2) + "%";
            // if (!(smStraightGot)) {
            //     if (odds.smStraight[i] !== 1 && odds.smStraight[i] > highestOdds[1]) {
            //         secondBestOdds[0] = highestOdds[0];
            //         secondBestOdds[1] = highestOdds[1];
            //         highestOdds[0] = "Small Straight of " + i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3);
            //         highestOdds[1] = odds.smStraight[i];
            //         sameOdds = [];
            //     } else if (odds.smStraight[i] == highestOdds[1]) sameOdds.push("Small Straight of " + i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3));
            //     else if (odds.smStraight[i] !== 1 && odds.smStraight[i] > secondBestOdds[1]) {
            //         secondBestOdds[0] = "Small Straight of " + i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3);
            //         secondBestOdds[1] = odds.smStraight[i];
            //     }
            // }
        }
        for (let j = 1; j <= 6; j++) {
            if (j != i) {
                odds.fullHouse[i][j] = oddsOfFH(j, i, dice);
                document.getElementById("triple-" + i + "-double-" + j + "-odds").textContent = i + "-" + i + "-" + i + "-" + j + "-" + j + ": " + (odds.fullHouse[i][j] * 100).toFixed(2) + "%";
                if (!(fullHouseGot)) {
                    if (odds.fullHouse[i][j] !== 1 && odds.fullHouse[i][j] > highestOdds[1]) {
                        secondBestOdds[0] = highestOdds[0];
                        secondBestOdds[1] = highestOdds[1];
                        highestOdds[0] = "Full House of " + i + "-" + i + "-" + i + "-" + j + "-" + j;
                        highestOdds[1] = odds.fullHouse[i][j];
                        sameOdds = [];
                    } else if (odds.fullHouse[i] [j]== highestOdds[1]) sameOdds.push("Full House of " + i + "-" + i + "-" + i + "-" + j + "-" + j);
                    else if (odds.fullHouse[i][j] !== 1 && odds.fullHouse[i][j] > secondBestOdds[1]) {
                            secondBestOdds[0] = "Full House of " + i + "-" + i + "-" + i + "-" + j + "-" + j;
                            secondBestOdds[1] = odds.fullHouse[i][j];
                    }
                }
            }
        }
    }
    //Calculate inclusive odds
    for (let i = 6; i > 0; i--) {
        let inclusive3Odds = odds.threeOfAKind[i] + odds.fourOfAKind[i] + odds.fiveOfAKind[i];
        if (inclusive3Odds > 1) inclusive3Odds = 1; //Make sure we don't go over 100%
        let inclusive4Odds = odds.fourOfAKind[i] + odds.fiveOfAKind[i];
        if (inclusive4Odds > 1) inclusive4Odds = 1; //Make sure we don't go over 100%
        document.getElementById("3-of-a-kind-odds-inc-" + i).textContent = i + "'s: " + (inclusive3Odds * 100).toFixed(2) + "%";
        document.getElementById("4-of-a-kind-odds-inc-" + i).textContent = i + "'s: " + (inclusive4Odds * 100).toFixed(2) + "%";
        document.getElementById("yahtzee-odds-inc-" + i).textContent = i + "'s: " + (odds.fiveOfAKind[i] * 100).toFixed(2) + "%";
        if (i < 4) {
            if (i < 3) document.getElementById("lg-straight-odds-inc-" + i).textContent = i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3) + "-" + (i+4) + ": " + (odds.lgStraight[i] * 100).toFixed(2) + "%";
            let inclusiveSmStraightOdds;
            if (i === 1) inclusiveSmStraightOdds = odds.smStraight[1] + odds.lgStraight[1];
            else if (i === 2) inclusiveSmStraightOdds = odds.smStraight[2] + odds.lgStraight[1] + odds.lgStraight[2];
            else inclusiveSmStraightOdds = odds.smStraight[3] + odds.lgStraight[2];
            if (inclusiveSmStraightOdds > 1) inclusiveSmStraightOdds = 1;
            document.getElementById("sm-straight-odds-inc-" + i).textContent = i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3) + ": " + (inclusiveSmStraightOdds * 100).toFixed(2) + "%";

            //Check if highest odds needs to be updated
            if (!smStraightGot) {
                if (inclusiveSmStraightOdds !== 1 && inclusiveSmStraightOdds > highestOdds[1]) {
                    secondBestOdds[0] = highestOdds[0];
                    secondBestOdds[1] = highestOdds[1];
                    highestOdds[0] = "Small Straight of " + i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3);
                    highestOdds[1] = inclusiveSmStraightOdds;
                    sameOdds = [];
                } else if (inclusiveSmStraightOdds == highestOdds[1]) sameOdds.push("Small Straight of " + i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3));
                else if (inclusiveSmStraightOdds !== 1 && inclusiveSmStraightOdds > secondBestOdds[1]) {
                    secondBestOdds[0] = "Small Straight of " + i + "-" + (i+1) + "-" + (i+2) + "-" + (i+3);
                    secondBestOdds[1] = inclusiveSmStraightOdds;
                }
            }
        }

        //Highest odds update
        if (!(threeOfAKindGot && numGot[i])) {
            if (inclusive3Odds !== 1 && inclusive3Odds > highestOdds[1]) {
                secondBestOdds[0] = highestOdds[0];
                secondBestOdds[1] = highestOdds[1];
                highestOdds[0] = "3-of-a-kind of " + i + "'s";
                highestOdds[1] = inclusive3Odds;
                sameOdds = [];
            } else if (inclusive3Odds == highestOdds[1]) sameOdds.push("3-of-a-kind of " + i + "'s");
            else if (inclusive3Odds !== 1 && inclusive3Odds > secondBestOdds[1]) {
                secondBestOdds[0] = "3-of-a-kind of " + i + "'s";
                secondBestOdds[1] = inclusive3Odds;
            }
        }

        if (!(fourOfAKindGot && numGot[i])) {
            if (inclusive4Odds !== 1 && inclusive4Odds > highestOdds[1]) {
                secondBestOdds[0] = highestOdds[0];
                secondBestOdds[1] = highestOdds[1];
                highestOdds[0] = "4-of-a-kind of " + i + "'s";
                highestOdds[1] = inclusive4Odds;
                sameOdds = [];
            } else if (inclusive4Odds == highestOdds[1]) sameOdds.push("4-of-a-kind of " + i + "'s");
            else if (inclusive4Odds !== 1 && inclusive4Odds > secondBestOdds[1]) {
                secondBestOdds[0] = "4-of-a-kind of " + i + "'s";
                secondBestOdds[1] = inclusive4Odds;
            }
        }
    }
    bestRollText.textContent = highestOdds[0];
    bestRollOdds.textContent = (highestOdds[1] * 100).toFixed(2) + "%";
    nextBestRollText.textContent = secondBestOdds[0];
    nextBestRollOdds.textContent = (secondBestOdds[1] * 100).toFixed(2) + "%";
}