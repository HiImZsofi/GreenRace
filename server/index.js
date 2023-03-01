//imports
import {
	checkEmailInDB,
	getIDFromDB,
	insertNewUser,
	getPassQuery,
} from "./queries.js";
import {
	usernameAndPasswordChangeHandler,
	onlyPasswordChangeHandler,
	onlyUsernameChangeHandler,
} from "./callbackHandlers.js";
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";

//server port
const PORT = process.env.PORT || 3001;
//Express setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//? middleware options ig
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Methods",
		"GET,PUT,POST,DELETE,UPDATE,OPTIONS"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
	);
	next();
});

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
	let hash = bcrypt.hashSync(password, saltRounds); //hash the given password with salt before inserting

	//Check for duplicate email
	//If it "succeeds" then it sets the status code to 500
	try {
		await checkEmailInDB(email);
		res.statusCode = 500;
	} catch (error) {
		res.statusCode = 100;
		console.log("code changed to", res.statusCode);
	}

	//Insert user into database
	try {
		await insertNewUser(username, hash, email);
		res.statusCode = 200;
		console.log("Inserted user", res.statusCode);
		res.send({ result: "Successful registration" });
	} catch (error) {
		res.statusCode = 500;
		console.log("Server error", res.statusCode);
		res.send({ error: "Duplicate email" });
	}
});

//jwt token sign function
function generateAccessToken(user_ID, email) {
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

//Login POST request handling
app.post("/login", async (req, res) => {
	//Store data in from the POST request
	const { email, password } = req.body;

	//Store data from SELECT query
	const passwordInDB = await getPassQuery(email).catch((error) => {
		res.statusCode = 404;
		console.log("404 User not found");
		res.send({ error: "Invalid email", response: error });
	});

	//Get user_id from the database
	const user_ID = await getIDFromDB(email).catch((error) => {
		throw error;
	});

	let token;

	//Check password againts the one fetched from the database
	if (res.statusCode != 404) {
		bcrypt.compare(password, passwordInDB).then((compareRes, compareErr) => {
			if (compareErr) throw compareErr;
			if (compareRes) {
				//Generate token
				try {
					token = generateAccessToken(user_ID, email);
				} catch (e) {
					throw new Error(e.message);
				}
				//Send token if the passwords matches
				res.send({ Authorization: token, id: user_ID });
				console.log("200 Logged In");
			} else {
				//Send error if the passwords don't match
				res.statusCode = 401;
				res.send({ error: "Invalid password" });
				console.log("401 Login Authorization Err");
			}
		});
	}
});

//User authorization
//Can be called in the callback of a route with the req and res params
function authorizeUserGetRequest(req, res) {
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

//User page route
//Authorize user
//TODO Send back appropriate user data
app.get("/userPage", (req, res) => {
	authorizeUserGetRequest(req, res);
});

//Friend page route
//Authorize user
//TODO Send back appropriate user data
app.get("/friendPage", (req, res) => {
	authorizeUserGetRequest(req, res);
});

//Rank page route
//Authorize user
//TODO Send back appropriate user data
app.get("/rankPage", (req, res) => {
	authorizeUserGetRequest(req, res);
});

//Logout route POST request
app.post("/logout", (req, res) => {
	//throw the cookie if user has logged out
	res.status(200).clearCookie("authorization", {
		path: "/login",
	});
	res.statusCode = 200;
	res.send("Logged out");
});

//Settings route POST request
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
			.then(
				usernameAndPasswordChangeHandler(newPassword, email, newUsername, res)
			);
	} //Change the password only
	else if (newPassword !== "") {
		bcrypt
			.compare(currentPassword, passwordInDB)
			.then(onlyPasswordChangeHandler(newPassword, email, res));
	} //Change username
	else if (newUsername !== "") {
		bcrypt
			.compare(currentPassword, passwordInDB)
			.then(onlyUsernameChangeHandler(email, newUsername, res));
	}
});

