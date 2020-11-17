// http://localhost:5000/menu?p=serverA.html

"use strict";

const express = require("express");
const request = require("request");
const fs = require("fs");

const app = express();
const port = 5000;
app.listen(port);

app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/menu", function (request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    }
});

function sendGet(url, callback) {
    request.get({
        url: url,
    }, function (error, response, body) {
        if (error) {
            callback(null);
        } else {
            callback(response.body);
        }
    });
}

app.get("/insert/car", function (request, response) {
    const name = request.query.name;
    const cost = request.query.cost;
    sendGet(`http://localhost:5015/insert/record?name=${name}&cost=${cost}`, function (answerString) {
        response.end(answerString);
    });
});

app.get("/select/car", function (request, response) {
    const name = request.query.name;
    sendGet(`http://localhost:5015/select/record?name=${name}`, function (answerString) {
        response.end(answerString);
    });
});

app.get("/insert/store", function (request, response) {
    const storeName = request.query.storeName;
    const cars = request.query.cars;
    sendGet(`http://localhost:5010/insert/record?storeName=${storeName}&cars=${cars}`, function (answerString) {
        response.end(answerString);
    });
});

app.get("/select/store", function (request, response) {
    const storeName = request.query.storeName;
    sendGet(`http://localhost:5010/select/record?storeName=${storeName}`, function (answerString) {
        response.end(answerString);
    });
});