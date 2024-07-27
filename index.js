const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine :", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

app.get("/" , (req ,res) => {
    res.send("server working well!")
})

let posts = [
    {
        id : "1a",
        username : 'user1',
        age : 23,
    },
    {
        id : "2b",
        username : 'user2',
        age : 17,
    },
    {
        id : "3c",
        username : 'user3',
        age : 20,
    },
];

app.get("/posts" , (req ,res) => {
    res.render("index.ejs", {posts})
});

app.get("/posts/new" , (req ,res) => {
    res.render("new.ejs")
});

app.post("/posts" , (req , res) => {
    let {username ,age} = req.body;
    posts.push({username, age})
    res.redirect("/posts")
})

app.get("/posts/:id" , (req , res) => {
    let {id} = req.params;
    let post = posts.find( (p) => id === p.id );
    console.log(id);
    res.render("show.ejs" , {post})
})

app.listen(port, () => {
    console.log(`listening port : ${port}`);
})