//Imports
import mysql from "mysql2";

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
export function checkEmailInDB(email) {
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
export function insertNewUser(username, hashedPassword, email) {
	return new Promise((resolve, reject) => {
		connection.query(
			"INSERT INTO users (username, password, email, points, picfilepath) VALUES (?, ?, ?,0, null)",
			[username, hashedPassword, email],
			function (err, result) {
				if (err) {
					return reject(err);
				}
				return resolve(200); //status code is 200 if insert was successful
			}
		);
	});
}

//Query password from the users table in the database
export function getPassQuery(email) {
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

export function getPassWithIDQuery(id) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"SELECT password FROM users WHERE user_id = ?",
			[id],
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result[0].password);
			}
		);
	});
}

export function changePassword(id, password) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"UPDATE users SET password = ? WHERE user_ID = ?",
			[password, id],
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result);
			}
		);
	});
}

export function changeUsername(id, username) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"UPDATE users SET username = ? WHERE user_ID = ?",
			[username, id],
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result);
			}
		);
	});
}

export function changeProfpic(id, picfilepath) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"UPDATE users SET picfilepath = ? WHERE user_ID = ?",
			[picfilepath, id],
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result);
			}
		);
	});
}

export function getUserDataFromDB(user_ID) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"SELECT username, picfilepath, points FROM users WHERE user_ID = ?",
			[user_ID],
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result[0]);
			}
		);
	});
}

export function getUserStatisticsFromDB(user_ID, date) {
	return new Promise((resolve, rejects) => {
		connection.query(
			"SELECT sum(emission) as SUM, date FROM `routes` WHERE user_id = ? && date > ? GROUP BY date",
			[user_ID, date],
			function (err, result) {
				return resolve(result);
			}
		);
	});
}

export function getRankListFromDB() {
	return new Promise((resolve, rejects) => {
		connection.query(
			"SELECT username, points, picfilepath FROM users ORDER BY points DESC",
			function (err, result) {
				if (err || result.length == 0) return rejects(err);
				return resolve(result);
			}
		);
	});
}

export function getIDFromDB(email) {
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
