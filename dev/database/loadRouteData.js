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
var RouteData = /** @class */ (function () {
    function RouteData(route_id, shortName, routeType) {
        this.route_id = route_id;
        this.short_name = shortName;
        this.route_type = routeType;
    }
    return RouteData;
}());
var routeDataList = [];
var filePath = "../routes.txt";
fs.readFile(filePath, "utf-8", function (err, data) {
    if (err) {
        console.error(err);
    }
    else {
        var line = data.split("\n");
        line.forEach(function (element) {
            var fields = element.split(",");
            var routeData = new RouteData(fields[1], fields[2], parseInt(fields[4]));
            routeDataList.push(routeData);
            console.log(routeData);
        });
    }
});
setTimeout(function () {
    routeDataList.forEach(function (element) {
        connection.query("INSERT INTO routedata (route_id, route_short_name, route_type) VALUES (?, ?, ?)", [element.route_id, element.short_name, element.route_type], function (err, result) {
            if (err)
                throw err;
            console.log("Data inserted");
        });
    });
}, 5000);
console.log("Success I guess");
