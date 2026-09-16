const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8001;

//Connection of mongodb
mongoose.connect("mongodb://127.0.0.1:27017/nothing-1")
.then(() => console.log("MongoDb Connected"))
.catch((err) => console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job_title: {
        type: String,
    },
    gender: {
        type: String,
    }
})
const User = mongoose.model('user', userSchema);

//Middleware
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFile(
        "logs.txt",
        `\n${Date.now()}:${req.ip}:${req.method}:${req.path}\n`,
        (err, data) => {
            next();
        }
    );
});


app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// REST APIs
app.get("/api/users", (req, res) => {
    res.setHeader("X-MyName", "Uditanshu"); //Custom Header
    return res.json(users);
});

app
    .route("/api/users/:id")
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

app.post("/api/users", async(req, res) => {
    const body = req.body;
    if (!body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title) {
        return res.status(400).json({ message: "All Fields Required" });
    }

    await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });
    return res.status(201).json({ message: "sucess" });
});

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});