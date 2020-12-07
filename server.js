const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listenining on port ${port} 🌎!`));
