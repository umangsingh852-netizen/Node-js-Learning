const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Req Rec\n`;
    const myUrl = url.parse(req.url, true);

    fs.appendFile('log.txt', log, (err, data) =>{
        switch(myUrl.pathname){
            case "/": res.end("HomePage");
            break;

            case "/about":  
                const username = myUrl.query.username;
                res.end(`Hi ${username}`);
                break;

            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
            default: res.end("404 Not Found");
        }
        res.end("Hello From Server");
    });
    
});

myServer.listen(8000, () => console.log("Server Started...!"));