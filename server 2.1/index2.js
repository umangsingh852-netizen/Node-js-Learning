const http = require("http");
const express = require("express")

app = express();

app.get("/", (req, res) => {
    return res.send("Greets from Homepage");
});

app.get("/about", (req, res) => {
    return res.send(`Hello ${res.query.name}`);
});

app.get("/profile", (req, res) => {
    return res.send("Greets from Profile page");
});

const myServer = http.createServer(app);

myServer.listen(8000, () => console.log("Server started") )