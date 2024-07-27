const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine :", "ejs");
app.set("views", path.join(__dirname, "views"))

app.set(express.static(path.join(__dirname, "public")))

app.get("/" , (req ,res) => {
    res.send("server working well!")
})

app.listen(port, () => {
    console.log(`listening port : ${port}`);
})