import * as fs from "fs";

var mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "greenrace",
});
connection.connect();

class Achievements {
  title: string;
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

let achievementList: Achievements[] = [];

const filepath = "../achievements.txt";

fs.readFile(filepath, "utf-8", (err, data) => {
  if (err) {
    throw err;
  } else {
    let line = data.split("\n");
    line.forEach((element) => {
      let fields: string[] = element.split(",");
      let linedata: Achievements = new Achievements(fields[0], fields[1]);
      achievementList.push(linedata);
      console.log(linedata);
    });
  }
});

setTimeout(() => {
  achievementList.forEach((element) => {
    connection.query(
      "INSERT INTO achivements (title, description) VALUES (?, ?)",
      [element.title, element.description],
      function (err, result) {
        if (err) throw err;
        console.log("Data inserted");
      }
    );
  });
}, 5000);
