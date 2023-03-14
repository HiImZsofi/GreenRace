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
  route_id: string;
  short_name: string;
  route_type: number;

  constructor(route_id: string, shortName: string, routeType: number) {
    this.route_id = route_id;
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
      let routeData: RouteData = new RouteData(
        fields[1],
        fields[2],
        parseInt(fields[4])
      );
      routeDataList.push(routeData);
      console.log(routeData);
    });
  }
});

setTimeout(() => {
  routeDataList.forEach((element) => {
    connection.query(
      "INSERT INTO routedata (route_id, route_short_name, route_type) VALUES (?, ?, ?)",
      [element.route_id, element.short_name, element.route_type],
      function (err, result) {
        if (err) throw err;
        console.log("Data inserted");
      }
    );
  });
}, 5000);
console.log("Success I guess");
