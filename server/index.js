//imports
const express = require("express");
const mysql = require("mysql2");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { resolve } = require("path");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//server port
const PORT = process.env.PORT || 3001;

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Connect to database
const connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	database: "greenRace",
	port: "3306",
});

//check if mysql server is ok
connection.connect((err) => {
	if (err) throw err;
	console.log("Mysql Connected...");
});

//checks if email already exists in database
function checkEmailInDB(email) {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT email FROM users WHERE email = ?",
			[email],
			function (err, result) {
				if (err || result.length === 0) {
					return reject(err); //if not then the query automatically moves on
				}
				return resolve(result[0].email); //if it exists then return the same email
			}
		);
	});
}

//own promise for sql query so async will not mess it up
function insertNewUser(sql) {
	return new Promise((resolve, reject) => {
		connection.query(sql, function (err, result) {
			if (err) {
				return reject(err);
			}
			return resolve(200); //status code is 200 if insert was successful
		});
	});
}

//Query password from the users table in the database
function getPassQuery(email) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"SELECT password FROM users WHERE email = ?",
			[email],
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result[0].password);
			}
		);
	});
}

function changePassword(email, password) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"UPDATE users SET password = ? WHERE email = ?",
			[password, email],
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result);
			}
		);
	});
}

function changeUsername(email, username) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"UPDATE users SET username = ? WHERE email = ?",
			[username, email],
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result);
			}
		);
	});
}

function getIDFromDB(email) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"SELECT user_ID FROM users WHERE email = ?",
			[email],
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result[0].user_ID);
			}
		);
	});
}

//start server on given port
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

//test page route
app.get("/", (req, res) => {
	res.send("Main page");
});

//register page route
app.post("/register", async (req, res) => {
	//request headers
	res.set({
		"Content-Type": "application/json",
	});

	//request data
	const { username, password, email } = req.body;

	const saltRounds = 10; //higher number harder it is to reverse
	var hash = bcrypt.hashSync(password, saltRounds); //hash the given password with salt before inserting

	var sql = `INSERT INTO users (username, password, email, points) VALUES ("${username}", "${hash}", "${email}",0)`; //TODO SQL injection????

	try {
		await checkEmailInDB(email);
		res.statusCode = 500;
	} catch (error) {
		res.statusCode = 100;
		console.log("code changed to", res.statusCode);
	}
	try {
		await insertNewUser(sql);
		res.statusCode = 200;
		console.log("Inserted user", res.statusCode);
		res.send(JSON.stringify({ result: "Successful registration" }));
	} catch (error) {
		res.statusCode = 500;
		console.log("Server error", res.statusCode);
		res.json(JSON.stringify({ error: "Duplicate email" }));
	}
});

//jwt token sign function
function generateAccessToken(username) {
	let secretKey = require("crypto").randomBytes(256).toString("base64");
	return jwt.sign({ email: this.email }, secretKey, { expiresIn: "1h" });
}

app.post("/login", async (req, res) => {
	//Store data in from the POST request
	const { email, password } = req.body;

	let data = {
		time: Date.now(),
		email: req.body.email,
	};

	//TODO Get id from the database based on the email
	//put it in user object with the token

	//Store data from SELECT query
	const passwordInDB = await getPassQuery(email).catch((error) => {
		res.statusCode = 404;
		console.log(404);
		res.send(JSON.stringify({ error: "Invalid email", response: error }));
	});

	//   const token = jwt.sign(
	//     data,
	//     secretKey,
	//     { expiresIn: "1h" },
	//     {
	//       algorithm: "HS256",
	//       expiresIn: "1h",
	//     }
	//   );

	let token;

	//Check password againts the one fetched from the database
	if (res.statusCode != 404) {
		bcrypt.compare(password, passwordInDB).then((compareRes, compareErr) => {
			if (compareErr) throw compareErr;
			if (compareRes) {
				try {
					token = generateAccessToken(email);
				} catch (e) {
					throw new Error(e.message);
				}
				res.cookie("authorization", token);
				res.send("ok");
				console.log("200 OK");
			} else {
				res.statusCode = 401;
				res.send(JSON.stringify({ error: "Invalid password" }));
				console.log("401 Auth Err");
			}
		});
	}
});

const checkToken = (req, res, next) => {
	const header = req.headers["authorization"];

	//make sure if token header is not undefined
	if (typeof header !== undefined) {
		const bearer = header.split(" ");
		const token = bearer[1];

		req.token = token;
		next();
	} else {
		//if undefined return forbidden status code
		res.sendStatus(403);
	}
};

app.get("/userPage", checkToken, (req, res) => {
	jwt.verify(req.token, "secretKey", (err, authorizedData) => {
		if (err) {
			res.sendStatus(403);
			console.log("Caught you lacking");
		} else {
			res.json({
				message: "Successful login",
			});
			console.log("Successful login");
		}
	});
});

app.post("/logout", (req, res) => {
	res.status(200).clearCookie("authorization", {
		path: "/login",
	});
	res.statusCode = 200;
	res.send("Logged out");
});

app.post("/settings", async (req, res) => {
	const { email, newUsername, newPassword, currentPassword } = req.body;
	const passwordInDB = await getPassQuery(email).catch((error) => {
		res.statusCode = 404;
		console.log(404);
		res.send(JSON.stringify({ error: "Invalid email", response: error }));
	});
	//Only runs if both values are changed
	if (newUsername != "" && newPassword !== "") {
		bcrypt
			.compare(currentPassword, passwordInDB)
			.then(async (compareRes, compareErr) => {
				if (compareErr) throw compareErr;
				if (compareRes) {
					let newEncryptedPassword = bcrypt.hashSync(newPassword, 10);
					try {
						await changeUsername(email, newUsername);
						await changePassword(email, newEncryptedPassword);
						res.statusCode = 200;
						res.send({ result: "Username and password updated" });
					} catch (error) {
						res.statusCode = 500;
						res.send({
							error: "UsernamePassword",
							errorUsername: "Error updating the username",
							errorPassword: "Error updating the password",
						});
					}
				} else {
					res.statusCode = 500;
					res.send({
						error: "Password",
						result: "Wrong password",
					});
				}
			});
	} //Change the password only
	else if (newPassword !== "") {
		bcrypt
			.compare(currentPassword, passwordInDB)
			.then(async (compareRes, compareErr) => {
				if (compareErr) throw compareErr;
				if (compareRes) {
					let newEncryptedPassword = bcrypt.hashSync(newPassword, 10);
					try {
						await changePassword(email, newEncryptedPassword);
						res.statusCode = 200;
						res.send({ result: "Password updated" });
					} catch (error) {
						res.statusCode = 500;
						res.send({
							error: "NewPassword",
							result: "Error updating the password",
						});
					}
				} else {
					res.statusCode = 500;
					res.send({
						error: "Password",
						result: "Wrong password",
					});
				}
			});
	} //Change username
	else if (newUsername !== "") {
		bcrypt
			.compare(currentPassword, passwordInDB)
			.then(async (compareRes, compareErr) => {
				if (compareErr) throw compareErr;
				if (compareRes) {
					try {
						await changeUsername(email, newUsername);
						res.statusCode = 200;
						res.send({ result: "Username updated" });
					} catch (error) {
						res.statusCode = 500;
						res.send({
							error: "Username",
							result: "Error updating the username",
						});
					}
				} else {
					res.statusCode = 500;
					res.send({
						error: "Password",
						result: "Wrong password",
					});
				}
			});
	}
});

//TODO SQL injection????
