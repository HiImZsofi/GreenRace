//imports
import {
	checkEmailInDB,
	getIDFromDB,
	insertNewUser,
	getPassQuery,
} from "./queries.js";
import {
	generateAccessToken,
	authorizeUserGetRequest,
	saveSettings,
	saveProfpic,
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
				res.send({ Authorization: token });
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

//User page route
//Authorize user
app.get("/userPage", (req, res) => {
	authorizeUserGetRequest(req, res, "user");
});

//Friend page route
//Authorize user
app.get("/friendPage", (req, res) => {
	authorizeUserGetRequest(req, res);
});

//Rank page route
//Authorize user
app.get("/rankPage", (req, res) => {
	authorizeUserGetRequest(req, res, "rank");
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
	saveSettings(req, res);
});

//ProfpicSetter route POST request
app.post("/profpicset", async (req, res) => {
	saveProfpic(req,res);
});