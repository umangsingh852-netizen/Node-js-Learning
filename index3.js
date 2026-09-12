const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { stringify } = require("querystring");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended: false}));

app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;

    res.send(html);
});

// REST APIs

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    })
    .patch((req, res) => {
        return res.json({ status: "pending" });
    })
    .delete((req, res) => {
        return res.json({ status: "pending" });
    });

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "pending"});
    })
});

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});