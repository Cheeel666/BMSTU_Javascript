"use strict";

const fs = require("fs");
const readlineSync = require('readline-sync');


function getHTMLInput(fields) {
    let string = "";
    for (let name of fields)
        string += `<p>Enter ${name}</p>\n\t<input name="${name}" spellcheck="false" autocomplete="off">\n\t`;

    return string;
}



function generate_page(addr, fields) {
    const usr_inputs = getHTMLInput(fields);
    const content = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>INPUT</title>
</head>
<body>
    <h1>INPUT</h1>
    <form method="GET" action="${addr}">
        <p>Enter your request</p>
        ${usr_inputs}
        <br>
        <br>
        <input type="submit" value="Submit">
    </form>
</body>
</html>
`;

    fs.writeFileSync("page.html", content);
}

generate_page("/result", ["A", "B", "C"])
