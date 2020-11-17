"use strict";

let num = parseInt(process.argv[2]);
let res = 1;

while (num > 1){
    res *= num;
    num -= 1;
}

console.log("task2_1:", res);