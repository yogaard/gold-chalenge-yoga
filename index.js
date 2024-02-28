const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => res.send("hello laban"));

app.listen(port, () => console.log("running on port 8080"));
