const express = require('express');
const PORT = process.env.PORT || 3306;
const app = express();
const cors = require("cors")
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/api', (request, response) => {
    response.json({message: "Api ok"});
});