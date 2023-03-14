import * as fs from "fs";
import { parse } from "path";
import { Any } from "typeorm";

var mysql = require("mysql");
const csv = require("csv-parser");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "greenrace",
});
connection.connect();

class StopsData {
  stop_id: string;
  stop_name: string;
  stop_lat: number;
  stop_lon: number;

  constructor(
    stop_id: string,
    stop_name: string,
    stop_lat: number,
    stop_lon: number
  ) {
    this.stop_id = stop_id;
    this.stop_name = stop_name;
    this.stop_lat = stop_lat;
    this.stop_lon = stop_lon;
  }
}

let stopsDataList: StopsData[] = [];
const filePath = "../stops.txt";
let currentData: StopsData;

fs.createReadStream(filePath)
  .pipe(csv(["stop_id", "stop_name", "stop_lat", "stop_lon"]))
  .on("data", (data) => {
    (currentData = new StopsData(
      data["stop_id"],
      data["stop_name"],
      data["stop_lat"],
      data["stop_lon"]
    )),
      stopsDataList.push(currentData);
  })
  .on("end", () => {
    console.log(stopsDataList);
  });

// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     let line = data.split("\n");
//     line.forEach((element) => {
//       let fields: string[] = element.split(",");
//       let stopsData: StopsData = new StopsData(
//         fields[0],
//         fields[1],
//         parseInt(fields[2]),
//         parseInt(fields[3])
//       );
//       stopsDataList.push(stopsData);
//     });
//   }
// });

// setTimeout(() => {
//   stopsDataList.forEach((element) => {
//     connection.query(
//       "INSERT INTO stopsdata (stop_id, stop_name, stop_lat, stop_lon) VALUES (?, ?, ?, ?)",
//       [element.stop_id, element.stop_name, element.stop_lat, element.stop_lon],
//       function (err, result) {
//         if (err) throw err;
//         console.log("Data inserted");
//       }
//     );
//   });
// }, 5000);
// console.log("Success I guess");
