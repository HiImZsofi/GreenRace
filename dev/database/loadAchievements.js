"use strict";
exports.__esModule = true;
var fs = require("fs");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "greenrace"
});
connection.connect();
var Achievements = /** @class */ (function () {
    function Achievements(title, description) {
        this.title = title;
        this.description = description;
    }
    return Achievements;
}());
var achievementList = [];
var filepath = "../achievements.txt";
fs.readFile(filepath, "utf-8", function (err, data) {
    if (err) {
        throw err;
    }
    else {
        var line = data.split("\n");
        line.forEach(function (element) {
            var fields = element.split(",");
            var linedata = new Achievements(fields[0], fields[1]);
            achievementList.push(linedata);
            console.log(linedata);
        });
    }
});
setTimeout(function () {
    achievementList.forEach(function (element) {
        connection.query("INSERT INTO achivements (title, description) VALUES (?, ?)", [element.title, element.description], function (err, result) {
            if (err)
                throw err;
            console.log("Data inserted");
        });
    });
}, 5000);
