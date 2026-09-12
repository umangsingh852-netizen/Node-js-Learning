const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");
const app = express()

app.get('/', (req, res) => {
    return res.send("Greetings from Home Page")
})

app.get('/about', (req, res) => {
    return res.send("Greetings from About Page")
})

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Req Rec\n`;
    const myUrl = url.parse(req.url, true);

    fs.appendFile('log.txt', log, (err, data) =>{
        switch(myUrl.pathname){
            case "/":
                if (req.method === 'GET') res.end("Home  Page")
            break;

            case "/about":  
                const username = myUrl.query.username;
                res.end(`Hi ${username}`);
                break;

            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);

            case "/signup":
                if (req.method === GET) res.end('This is a Signup Form');
                else if (req.method === POST){
                    res.end("Success");
                }
            default: res.end("404 Not Found");
        }
        res.end("Greetings From Server");
    });
    
});

myServer.listen(8000, () => console.log("Server Started...!"));