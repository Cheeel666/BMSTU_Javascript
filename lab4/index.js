"use strict";

const fs = require("fs");
const readlineSync = require('readline-sync');

const express = require("express");

const app = express();
const port = 5016;
app.listen(port);
console.log("My server on port " + port);
function createJsonArr(){
    const arr = [1,2,3,4,5,6,7,8,9,10];
    const jarray = JSON.stringify(arr);
    fs.writeFileSync("array.txt", jarray);

}


app.get("/me/page", function(request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

app.get("/bigger/number", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);
    var bn = c;
    if (a > b && a > c){
      bn = a;
    }
    if (b > a && b > c){
      bn = b;
    }
    const answerJSON = JSON.stringify({result: bn});
    response.end(answerJSON);
});
app.get("/array", function(request, response) {
    const i = request.query.index;
    const aInt = parseInt(i);
    const jarray = fs.readFileSync("array.txt", "utf8");
    const array = JSON.parse(jarray);
    const answerJSON = JSON.stringify({result: array[aInt]});
    response.end(answerJSON);
});
app.get("/generate/array", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);
    let array = [];
    for (let value = aInt; value <= bInt; value++) {
        if (value % cInt === 0) {
            array.push(value);
        }
    }
    const answerJSON = JSON.stringify({result: array});
    response.end(answerJSON);
});
//http://localhost:5015/me/page?p=b.html
