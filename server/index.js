//require express.js
const express = require('express');

//server port
const PORT = process.env.PORT || 3306;
const app = express();
const cors = require("cors")
app.use(cors())

//start server on given port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/api', (request, response) => {
    response.json({message: "Api ok"});
});