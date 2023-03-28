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
      "SELECT username, picfilepath, points, email FROM users WHERE user_ID = ?",
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
        if (err || result.length == 0) return rejects(err);
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

export function getRouteNumbers() {
  return new Promise((resolve, rejects) => {
    connection.query(
      "SELECT route_id, route_short_name, route_type FROM routedata ORDER BY route_data_id ASC",
      function (err, result) {
        if (err || result.length == 0) return rejects(err);
        return resolve(result);
      }
    );
  });
}

export function getStops() {
  return new Promise((resolve, rejects) => {
    connection.query(
      "SELECT stop_id, stop_name, stop_lat, stop_lon FROM stopsdata",
      function (err, result) {
        if (err || result.length == 0) return rejects(err);
        return resolve(result);
      }
    );
  });
}

export function insertNewRoute(route_id, user_id, emission, distance) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO routes (route_id, user_id, emission, length) VALUES (?, ?, ?, ?)",
      [route_id, user_id, emission, distance],
      function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(200); //status code is 200 if insert was successful
      }
    );
  });
}

export function getRouteData(user_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT routes.user_id, routes.emission, routes.length, routedata.route_short_name, routedata.route_type FROM routes JOIN routedata ON routes.route_id = routedata.route_id WHERE routes.user_id = ?",
      [user_id],
      function (err, result) {
        if (err || result.length == 0) return reject(err);
        return resolve(result);
      }
    );
  });
}

export function insertNewAchievement(achievement_id, user_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO completions (user_id, achivement_id, completion_date) VALUES (?, ?, GETDATE())",
      [user_id, achievement_id],
      function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(200); //status code is 200 if insert was successful
      }
    );
  });
}
