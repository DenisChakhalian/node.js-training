import express from "express"

const port = 8000;
const app = express();

app.all("/hello", (req, res, next) => {
    console.log("All");
    next();
});

const callBack = (req, res, next) => {
    console.log("callBack");
    next();
}

app.route("/user")
    .get("/hello", callBack, (req, res) => {
        res.send("Hello, dude")
    })
    .post("/hello", callBack, (req, res) => {
        res.send("Hello, postDude")
    });

app.listen(port, () => {
    console.log("Server on http://localhost:", port)
});