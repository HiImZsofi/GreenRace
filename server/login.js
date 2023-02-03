//Imports
const express = require("express");

//Database config
//? Maybe extract it to another js file for easier reuse
const PORT = process.env.PORT || 3306;
const app = express();
const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

//User POSTs info to the backend
app.post("/login", (req, res) => {
	//Store data in from the POST request
	const { username, password } = req.body;
	//Try username againts the database
	try {
		const { passwordInDB } = connection
			.selectFrom(user)
			.where(user.username.equals(username))
			.select({
				username: user.username,
				password: user.password,
			})
			.executeSelectOne();
	} catch (error) {
		res.send("Incorrect username");
	}

	//Check password againts the one fetched from the database
	if (password === passwordInDB) {
		//TODO: decrypt encrypted password
		res.send("Successful login");
	} else {
		res.send("Incorrect password");
	}
});
