//Imports
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
var mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//Database config
//? Maybe extract it to another js file for easier reuse
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "greenRace",
	port: 3306,
});

//Query password from the users table in the database
function getPassQuery(username) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"SELECT password FROM users WHERE username = ?",
			[username],
			function (err, result) {
				if (err) return rejects(err);
				return resolve(result[0].password);
			}
		);
	});
}

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

//User POSTs info to the backend
app.post("/login", async (req, res) => {
	//TODO: decrypt encrypted password
	//Store data in from the POST request
	const { username, password } = req.body;

	//Store data from SELECT query
	const passwordInDB = await getPassQuery(username);

	//Check password againts the one fetched from the database
	//TODO send http codes
	if (password === passwordInDB) {
		res.statusCode = 200;
		res.send("Successful login");
		console.log("200 OK");
	} else {
		res.statusCode = 401;
		res.send("Incorrect password");
		console.log("401 err");
	}
});
