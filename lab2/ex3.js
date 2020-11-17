"use strict";

function timeSecond(a, b, time = 2000){

  let interval = setInterval(() => {
    if (a === b){
      timeFirst(1, 10);
      clearInterval(interval);
    }
    console.log(a);
    a++;
  }, time);
}
function timeFirst(a, b, time = 1000){

  let interval = setInterval(() => {
    if (a === b){
      timeSecond(11, 20);
      clearInterval(interval);
    }
    console.log(a);
    a++;
  }, time);
}

timeFirst(1, 10);
