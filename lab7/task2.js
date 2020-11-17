"use strict";

const execSync = require('child_process').execSync;

function runWithCmd(s) {
    const options = { encoding: 'utf8' };
    const cmd = s.toString();
    const answer = execSync(cmd, options);
    return answer.toString();
}

const task1Arg = 6;

const task1Command = `node task2_1.js ${task1Arg}`;
let factorial = runWithCmd(task1Command)
console.log(factorial)

const task2NumberOfArgs = 5;
const task2Args = [1, 2, 3, 4, 5];

let task2Command = `node task2_2.js ${task2NumberOfArgs}`;
for (let i = 0; i < task2NumberOfArgs; i++) {
    task2Command += ` ${task2Args[i]}`;
}
let factorials = runWithCmd(task2Command);
console.log(factorials);