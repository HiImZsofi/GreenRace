//Imports
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
var mysql = require("mysql2");
const { connect } = require("http2");
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

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

//User POSTs info to the backend
app.post("/login", (req, res) => {
	//Store data in from the POST request
	//const { username, password } = req.body;
	console.log(req.body, "Success");

	// let passwordInDB = connection.query(
	// 	'SELECT password FROM users WHERE username="asd"'
	// );

	//Try username againts the database
	// try {
	// 	passwordInDB = connection
	// 		.selectFrom(user)
	// 		.where(user.username.equals(username))
	// 		.select({
	// 			username: user.username,
	// 			password: user.password,
	// 		})
	// 		.executeSelectOne();
	// } catch (error) {
	// 	res.send("Incorrect username");
	// }

	//Check password againts the one fetched from the database
	// if (password === passwordInDB) {
	// 	//TODO: decrypt encrypted password
	// 	res.send("Successful login");
	// } else {
	// 	res.send("Incorrect password");
	// }
});
