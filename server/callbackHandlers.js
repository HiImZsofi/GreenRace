import { changePassword, changeUsername } from "./queries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//jwt token sign function
export function generateAccessToken(user_ID, email) {
	let secretKey = "secret"; //! move secret keys to dotenv
	return jwt.sign(
		{ user_id: user_ID, email: email },
		secretKey,
		{ algorithm: "HS256" },
		{
			expiresIn: "1h",
			issuer: "http://localhost:3001",
		}
	);
}

//User authorization
//Can be called in the callback of a route with the req and res params
export function authorizeUserGetRequest(req, res) {
	const header = req.headers["authorization"];

	//make sure if token header is not undefined
	if (header !== undefined) {
		const bearer = header.split(" "); //separate request token from bearer
		const token = bearer[1];
		req.token = token;
	} else {
		//if undefined return forbidden status code
		res.statusCode = 403;
	}
	//TODO use .decode to get the payload from the token
	//TODO so the id won't have to be sent to the frontend separately
	jwt.verify(
		req.token,
		"secret",
		{ algorithm: "HS256" },
		(err, authorizedData) => {
			if (err) {
				res.sendStatus(403);
				console.log("403 Forbidden request");
			} else {
				res.sendStatus(200);
				console.log("200 Successful request");
			}
		}
	);
}

//Used when only the new username field is filled in
export function onlyUsernameChangeHandler(email, newUsername, res) {
	return async (compareRes, compareErr) => {
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
	};
}

//Used only when the new password field is filled
export function onlyPasswordChangeHandler(newPassword, email, res) {
	return async (compareRes, compareErr) => {
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
	};
}

//Used when both the new username and password fields are filled
export function usernameAndPasswordChangeHandler(
	newPassword,
	email,
	newUsername,
	res
) {
	return async (compareRes, compareErr) => {
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
	};
}
