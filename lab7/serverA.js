"use strict";

const fs = require("fs");
const express = require("express");

const app = express();
const port = 5015;
app.listen(port);

app.get("/loadDataPage", function (request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    }
});

app.get("/insert/record", function (request, response) {
    const name = request.query.name;
    const cost = parseInt(request.query.cost);

    let fileContents = fs.readFileSync("serverA.json");
    let jsonData = JSON.parse(fileContents);

    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i]['name'] == name) {
            response.end(JSON.stringify({ result: "Car is not unique" }));
            return;
        }
    }

    let newCar = { name: name, cost: cost };
    jsonData.push(newCar);
    fs.writeFileSync("serverA.json", JSON.stringify(jsonData));

    response.end(JSON.stringify({ result: "Succesfully added!" }));
});

app.get("/select/record", function (request, response) {
    const name = request.query.name;

    let answerJSON;

    let fileContents = fs.readFileSync("serverA.json");
    let jsonData = JSON.parse(fileContents);

    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i]['name'] == name) {
            answerJSON = JSON.stringify({ name: name, cost: jsonData[i]['cost'] });
            response.end(answerJSON);
            return;
        }
    }

    answerJSON = JSON.stringify({ result: "No car with such name" });
    response.end(answerJSON);
});