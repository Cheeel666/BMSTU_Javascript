"use strict";

function ajaxPost(urlString, bodyString, callback) {
    let r = new XMLHttpRequest();
    r.open("POST", urlString, true);
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(bodyString);
    r.send(bodyString);
    r.onload = function () {
        callback(r.response);
    }
}

function makeAction() {
    let email = document.getElementById('email').value;
    let surname = document.getElementById('surname').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    ajaxPost("/addUser", JSON.stringify({
        email, surname, phoneNumber
    }), function (answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        alert(result);
    });
}