// Imports
var mysql = require("mysql2");
var express = require("express");

// Connect to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "greenRace",
  port: 3306,
});

// This helps to avoid FOREIGN KEY's bullshit
connection.query("SET FOREIGN_KEY_CHECKS=0;");

// Create users table
connection.query(
  "CREATE OR REPLACE TABLE Users (user_ID int PRIMARY KEY AUTO_INCREMENT, username VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, points INT, picfilename VARCHAR(255), picfilepath VARCHAR(255))",
  function (err, result) {
    if (err) throw err;
    console.log("Table Users created or modified");
  }
);

// Create friendships table
connection.query(
  "CREATE OR REPLACE TABLE Friendships (friendship_ID int PRIMARY KEY AUTO_INCREMENT, user_ID int NOT NULL, friend_id int NOT NULL, CONSTRAINT fk_fuuser_id FOREIGN KEY (user_ID) REFERENCES Users (user_ID), CONSTRAINT fk_ffuser_id FOREIGN KEY (friend_ID) REFERENCES Users (user_ID))",
  function (err, result) {
    if (err) throw err;
    console.log("Table Friendships created or modified");
  }
);

// Create achivements table
connection.query(
  "CREATE OR REPLACE TABLE Achivements (achivement_ID int PRIMARY KEY AUTO_INCREMENT)",
  function (err, result) {
    if (err) throw err;
    console.log("Table Achivements created or modified");
  }
);

// Create Completions table
connection.query(
  "CREATE OR REPLACE TABLE Completions (completion_ID int PRIMARY KEY AUTO_INCREMENT, user_ID int NOT NULL, achivement_ID int NOT NULL, completion_date DATETIME NOT NULL, CONSTRAINT fk_cuser_id FOREIGN KEY (user_ID) REFERENCES Users (user_ID), CONSTRAINT fk_achi_id FOREIGN KEY (achivement_ID) REFERENCES Achivements (achivement_ID))",
  function (err, result) {
    if (err) throw err;
    console.log("Table Completions created or modified");
  }
);

// Create Vehicles table
connection.query(
  "CREATE OR REPLACE TABLE Vehicles (vehicle_id int PRIMARY KEY AUTO_INCREMENT, vehicle_type VARCHAR(30) NOT NULL, model VARCHAR(255), emission int NOT NULL)",
  function (err, result) {
    if (err) throw err;
    console.log("Table Vehicles created or modified");
  }
);

// Create Route table
connection.query(
  "CREATE OR REPLACE TABLE Routes (route_id int PRIMARY KEY AUTO_INCREMENT, user_id int NOT NULL, vehicle_id int NOT NULL, length int, CONSTRAINT fk_ruser_id FOREIGN KEY (user_ID) REFERENCES Users (user_ID), CONSTRAINT fk_vehicle_id FOREIGN KEY (vehicle_id) REFERENCES Vehicles (vehicle_id))",
  function (err, result) {
    if (err) throw err;
    console.log("Table Routes created or modified");
  }
);

connection.query(
  "CREATE OR REPLACE TABLE RouteData (route_data_id int PRIMARY KEY AUTO_INCREMENT, route_id VARCHAR(5), route_short_name VARCHAR(5), route_type int)",
  function (err, result) {
    if (err) throw err;
    console.log("Table RouteData created or modified");
  }
);

connection.query(
  "CREATE OR REPLACE TABLE StopsData (stop_data_id int PRIMARY KEY AUTO_INCREMENT, stop_id VARCHAR(10), stop_name VARCHAR(30), stop_lat VARCHAR(30), stop_lon VARCHAR(30))",
  function (err, result) {
    if (err) throw err;
    console.log("Table StopsData created or modified");
    process.exit();
  }
);

connection.query("SET FOREIGN_KEY_CHECKS=1;");
