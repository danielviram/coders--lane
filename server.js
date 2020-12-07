const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

require("./startup/routes")(app);
require("./startup/db")();

if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));
  
    // Handle React routing, return all requests to React app
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listenining on port ${port} 🌎!`));
