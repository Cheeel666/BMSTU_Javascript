"use strict";

let gameArray = [{ name: "DOTA2", description: "DEFENCE OF THE ANCIENT2", age: 48 },
                { name: "Forza", description: "race game", age: 10 },
                { name: "HTKUN", description: "How to annoy your neighbour", age: 100 },
                { name: "warface", description: "Игра для школьников", age: 1 },
                { name: "Battlefield", description: "Стрелялка", age: 12 },
                { name: "CS:GO", description: "Counter strike:global offencive", age: 12 }];


const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

app.set("view engine",  "hbs");
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));
app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/page/games", function(request, response){
    const minAge = parseInt(request.query.age);
    let goodGames = [];
    for (let i = 0; i < gameArray.length; i++){
        if (gameArray[i]['age'] <= minAge){
            goodGames.push(gameArray[i]);
        }
    }
    const info = {
            descriptionValue: "Разрешенные игры:",
            gameArray: goodGames
    };  
    response.render("games.hbs", info);
});
// http://localhost:5000/page/games?age=18