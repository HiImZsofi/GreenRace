import { changePassword, changeUsername } from "./queries.js";
import bcrypt from "bcrypt";

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
