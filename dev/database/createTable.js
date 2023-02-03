//Imports
var mysql = require('mysql2');
var express = require('express');

//Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'greenRace',
    port: 3306
});

//Create users table
connection.query(
    'CREATE OR REPLACE TABLE Users (user_ID VARCHAR(255) PRIMARY KEY, username VARCHAR(30) NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, points INT, picfilename VARCHAR(255), picfilepath VARCHAR(255))',
    function(err, result){
        if(err) throw err;
            console.log("Table Users created or modified");
    }
);

//Create friends table
connection.query(
    'CREATE OR REPLACE TABLE Friends (friend_ID VARCHAR(255) PRIMARY KEY, user_ID VARCHAR(255) NOT NULL, CONSTRAINT fk_user_id FOREIGN KEY (user_ID) REFERENCES Users (user_ID) ON DELETE CASCADE ON UPDATE RESTRICT)',
    function(err, result){
        if(err) throw err;
            console.log("Table Friends created or modified");
            process.exit();
    }
);
//