"use strict";

let num = parseInt(process.argv[2]);

let arrFact = [];
for (let i = 0; i < num; i++){
    let res = 1;
    let num = parseInt(process.argv[3 + i]);

    while (num > 1){
        res *= num;
        num -= 1; 
    }
    arrFact.push(res);
}
console.log(arrFact); 

//  node task2_2.js 5 1 2 3 2 3