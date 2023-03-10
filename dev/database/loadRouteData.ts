import * as fs from "fs";
import { parse } from "path";

var mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "greenrace",
});
connection.connect();

class RouteData {
  short_name: string;
  route_type: number;

  constructor(shortName: string, routeType: number) {
    this.short_name = shortName;
    this.route_type = routeType;
  }
}

let routeDataList: RouteData[] = [];

const filePath = "../routes.txt";

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let line = data.split("\n");
    line.forEach((element) => {
      let fields: string[] = element.split(",");
      let routeData: RouteData = new RouteData(fields[2], parseInt(fields[4]));
      routeDataList.push(routeData);
      console.log(routeData);
    });
  }
});

setTimeout(() => {
  routeDataList.forEach((element) => {
    connection.query(
      "INSERT INTO routedata (route_short_name, route_type) VALUES (?, ?)",
      [element.short_name, element.route_type],
      function (err, result) {
        if (err) throw err;
        console.log("Data inserted");
      }
    );
  });
}, 5000);
console.log("Success I guess");
