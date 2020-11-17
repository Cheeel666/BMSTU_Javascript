"use strict";

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


// body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}
// http://localhost:5000/page.html
app.post("/addUser", function(request, response){
    loadBody(request, function(body){
        const object = JSON.parse(body);
        const email = object['email'];
        const surname = object['surname'];
        const phoneNumber = object['phoneNumber'];

        let info = fs.readFileSync("userData.json");
        let jsonInfo = JSON.parse(info);
        var uniq = true;

        for (let i = 0; i < jsonInfo.length; i++){
            if (jsonInfo[i]['email'] == email){
                uniq = false;
                break;
            }
            if (jsonInfo[i]['phoneNumber'] == phoneNumber){
                uniq = false;
                break;
            }

        }
        var resultString = "";       
        if (!uniq){
            resultString = "Данные не уникальны";
        }
        else {
            let newUser = { email: email, username: surname, phoneNumber: phoneNumber };

            jsonInfo.push(newUser);

            fs.writeFileSync("userData.json", JSON.stringify(jsonInfo));
            resultString = "Пользователь успешно добавлен!";
        }
        const answerJSON = JSON.stringify({ result: resultString });
        response.end(answerJSON);
    });
});

app.get("/page", function (request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("static/bad.html", "utf8");
        response.end(contentString);
    }
});
// http://localhost:5010/me/page?p=task2.html
app.get("/getUser", function (request, response) {
    const email = request.query.email;

    let jsonContents = JSON.parse(fs.readFileSync("userData.json"));
    let userExists = false;
    let resultObject = [];

    for (let i = 0; i < jsonContents.length; i++) {
        if (jsonContents[i]['email'] == email) {
            userExists = true;
            resultObject = { email: jsonContents[i]['email'], surname: jsonContents[i]['surname'], phoneNumber: jsonContents[i]['phoneNumber'] };
            break;
        }
    }

    if (!userExists) {
        resultObject = { result: "User not found!" };
    }

    console.log(resultObject);

    const answerJSON = JSON.stringify(resultObject);
    response.end(answerJSON);
});