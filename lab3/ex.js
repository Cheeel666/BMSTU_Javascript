"use strict";

const fs = require('fs');
const readlineSync = require('readline-sync');
const compileFunction = require('vm');
const path = require('path');
const dir = require('console');

const stringEvenLengthInput = (file) =>{ //1
  let n;
  let string;
  let sArray = [];

  n = readlineSync.question("input N:");
  for (let i = 0; i < n; i++){
    string = readlineSync.question("input string:");
    if (string.length % 2 === 0){
      sArray.push(string);
    }
  }
  console.log("Strings:", sArray);
  const jsonStringArray = JSON.stringify(sArray, n, 4);
  fs.writeFileSync(file, jsonStringArray);
}

const stringVowelsOutput = (fileName) => {  //2
    let stringArray = [];
    let vowels = "aeiou";

    if (fs.existsSync(fileName)) {
        const contentString = fs.readFileSync(fileName, "utf8");
        stringArray = JSON.parse(contentString);

        stringArray.forEach(string => {
            for (let i = 0; i <= string.length - 1; i++) {
                if (vowels.indexOf(string.toLowerCase().charAt(i)) < 0) {
                    stringArray.splice(stringArray.indexOf(string), 1);
                }
            }
        });

        console.log("Array of strings consist of only vowels: ", stringArray);
    }
}

const fileContent = () => { //3
    const folderName = readlineSync.question("Input folder name: ");
    const extensionName = readlineSync.question("Input extension name: ");
    const filesArray = fs.readdirSync(folderName);
    const filePath = "/Users/ilchel/Desktop/JavaScript/lab3/";
    filesArray.forEach(fileName => {
        if (fileName.split('.')[1] === extensionName) {
            console.log('\n');
            console.log(fileName + ': ');
            console.log(fs.readFileSync(filePath + folderName + '/' + fileName, "utf8"));
        }
    });
}

const filesOutputByPath = (dirPath) => {  //  4
    fs.readdirSync(dirPath).forEach(function(file) {
        let filepath = path.join(dirPath, file);
        let stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            filesOutputByPath(filepath);
        } else {
            (fs.readFileSync(filepath).length <= 10) ? console.log(`\n${filepath} \n${fs.readFileSync(filepath)}`) : null;
        }
    });
}

const task5 = () => {
  let n;
  let fileName;
  let fileContent = [];
  let fileContentCombined = "";

  n = readlineSync.question("Input N:");
  for (let i = 0; i < n; i++){
    fileName = readlineSync.question("Input file name:");
    if (fs.existsSync(fileName)){
      fileContent.push(fs.readFileSync(fileName, "utf8"));
    }
  }

  fileContent.forEach(fileContentc =>{
    fileContentCombined += fileContentc;
  });
  fs.writeFileSync("combine.txt", fileContentCombined);
}

const findMaxAvailableNestingLevel = () => {  //  6
    let jsonString;
    let objString = '{"k":""}';
    let flag = true;
    let levelNumber = 0;

    while (flag !== false) {
        objString = objString.replace('""', '{"k":""}');
        levelNumber++;

        //fs.writeFileSync("tst.txt", objString);
        const obj = JSON.parse(objString);

        try {
            jsonString = JSON.stringify(obj);
        } catch (err) {
            console.error(err.message);
            console.log("Nesting level - ", levelNumber);
            flag = false;
        }

        if (levelNumber % 1000 === 0) {
            console.log(levelNumber);
        }
    }
}


function findObjectMaxNestingLevel(obj) { // 7
    let arr = [];
    let maxVal = 0;
    let finalObj;
    getProp(obj, 0, arr);

    function getProp(o, id, stack) {

        for (const prop in o) {
            if (typeof(o[prop]) === 'object') {
                let clone = stack.slice();
                clone.push(prop);
                getProp(o[prop], id + 1, clone);
            }

            if (id > maxVal) {
                maxVal = id
                finalObj = stack
                finalObj.push(prop)
            }
        }
    }
    console.log(maxVal, finalObj)
}

const example = {
  a1: {
        b1: {
            c: 2
        },
        b2: {
            c: 21
        },
        b3: {
            c: {
                d: 3,
                e: 31,
                f: {
                    g: 4,
                    h: {
                        i: {
                            j: 5,
                            k: 'string',
                            l: [1,1,1,1,1],
                        }
                    }
                }
            }
        }
    }
}
const fileName = "a.txt";
const filePath = "/Users/ilchel/Desktop/JavaScript/lab3/example";

// stringEvenLengthInput(fileName);
// stringVowelsOutput(fileName);
 fileContent();
// filesOutputByPath(filePath);
// task5();
// findMaxAvailableNestingLevel();
findObjectMaxNestingLevel(example);
