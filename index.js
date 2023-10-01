import express from "express";

const app = express();
const port = 3000;
const object = {
    count: 0,
    task: [],
    desc: [],
    form: 0
};
let prev = " ", flag = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const checkDuplicate = (req, res, next) => {
    if (`${req.body["task"]}` == prev || `${req.body["task"]}`.length == 0)
        flag = 0;
    else
        flag = 1;
    next();
}
app.use(checkDuplicate);

app.get("/", (req, res) => {
    res.render("index.ejs", object);
});

app.post('/add', (req, res) => {
    object.form = object.form == 1 ? 0 : 1;
    res.render("index.ejs", object);
});

app.post("/submit", (req, res) => {
    if (flag != 0) {
        prev = `${req.body["task"]}`;
        object.task[object.count] = prev;
        object.desc[object.count] = `${req.body["desc"]}`;
        object.count++;
        object.form = 0;
        res.render("index.ejs", object);
    }
});


app.listen(port, (req, res) => {
    console.log(`Listening to port.. ${port}`);
});