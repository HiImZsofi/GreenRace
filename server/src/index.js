//imports
import {
  checkEmailInDB,
  getIDFromDB,
  insertNewUser,
  getPassQuery,
  getRouteNumbers,
  insertNewRoute,
} from "./queries.js";
import {
  generateAccessToken,
  authorizeUserGetRequest,
  saveSettings,
  saveProfpic,
  getChartData,
} from "./callbackHandlers.js";
import { setStopNames } from "./userStopsData.js";
import { getFinalEmission } from "./emissionCalc.js";
import {
  first500gEmission,
  atLeast2kgEmission,
  onceOnEveryVehicleType,
  fromOneEndToAnother,
  suburbanRailwayTraveller,
} from "./achivementZso.js";
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getDistance } from "./stationsDistance.js";

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

  let token;

  //Check password againts the one fetched from the database
  if (res.statusCode != 404) {
    //Get user_id from the database
    const user_ID = await getIDFromDB(email).catch((error) => {
      throw error;
    });

    //using bcrypt built in function to compare the encrypted passwords to each other
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

app.get("/chartData", (req, res) => {
  getChartData(req, res);
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
  saveProfpic(req, res);
});

//send back every line from the database
app.get("/logRoute", async (req, res) => {
  //request every line available for display
  let routeData = await getRouteNumbers().catch((err) => {
    throw err;
  });
  res.send({ routeData: routeData });
});

app.post("/get/routeData", async (req, res) => {
  var stopNames = [];

  //pass down the id coming from the user
  var userGivenId = req.body.lineid;

  //fill up array with the stops for the chosen line
  stopNames = await setStopNames(userGivenId);

  //send the array back to display it on mobile
  res.send({ stopNames: stopNames });
});

app.post("/get/distance", async (req, res) => {
  var token = req.body.token;
  var routeType = req.body.routeType;
  var route_id = req.body.route_id;
  var onStop = req.body.onStop;
  var offStop = req.body.offStop;

  var emission = await getFinalEmission(routeType, route_id, onStop, offStop);

  //get user id from the jwt token to store it in database
  var user_id = jwt.decode(token).user_id;
  try {
    await insertNewRoute(
      route_id,
      user_id,
      emission["finalEmission"],
      emission["distance"],
      onStop,
      offStop
    );
  } catch (error) {
    throw error;
  }

  res.send({ emission: emission });
});

app.get("/check/completion", async (req, res) => {
  var token = req.headers.token;

  var user_id = jwt.decode(token).user_id;

  try {
    var firstAchivement = await first500gEmission(user_id);
    var fifthAchivement = await atLeast2kgEmission(user_id);
    var sixthAchivement = await onceOnEveryVehicleType(user_id);
    var eighthAchivement = await fromOneEndToAnother(user_id);
    var twelvethAchievement = await suburbanRailwayTraveller(user_id);
  } catch (error) {
    throw error;
  }
  //TODO az összes completiont berakni egy arraybe és azt visszaküldeni
  res.send({ isCompleted: eighthAchivement });
});
