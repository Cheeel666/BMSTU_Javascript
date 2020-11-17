"use strict";

const fs = require("fs");
const express = require("express");
const { join } = require("path");

const app = express();
const port = 5010;
app.listen(port);

app.get("/loadDataPage", function (request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    }
});

app.get("/insert/record", function (request, response) {
    const storeName = request.query.storeName;
    let cars = request.query.cars.split(',');

    let fileContents = fs.readFileSync("serverB.json");
    let jsonData = JSON.parse(fileContents);

    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i]['storeName'] == storeName) {
            response.end(JSON.stringify({ result: "Store is not unique" }));
            return;
        }
    }

    let newCar = { storeName: storeName, cars: cars };
    jsonData.push(newCar);
    fs.writeFileSync("serverB.json", JSON.stringify(jsonData));

    response.end(JSON.stringify({ result: "Succesfully added!" }));
});

app.get("/select/record", function (request, response) {
    const storeName = request.query.storeName;

    let answerJSON;

    let fileContents = fs.readFileSync("serverB.json");
    let jsonData = JSON.parse(fileContents);

    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i]['storeName'] == storeName) {
            answerJSON = JSON.stringify({ name: storeName, cars: jsonData[i]['cars'] });
            response.end(answerJSON);
            return;
        }
    }

    answerJSON = JSON.stringify({ result: "No store with such name" });
    response.end(answerJSON);
});