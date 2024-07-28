const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));

app.set("view engine :", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

app.get("/" , (req ,res) => {
    res.send("server working well!")
})

let posts = 
[
    {id : uuidv4(),username : 'user1',age : 23,},
    {id : uuidv4(),username : 'user2',age : 17,},
    {id : uuidv4(),username : 'user3',age : 20,},
];

app.get("/posts" , (req ,res) => {
    res.render("index.ejs", {posts})
});

app.get("/posts/new" , (req ,res) => {
    res.render("new.ejs")
});

app.post("/posts" , (req , res) => {
    let {username ,age} = req.body;
    let id = uuidv4(); 
    // posts.push({id,username, age})
    posts.push({id,username,age})
    res.redirect("/posts")
});

app.get("/posts/:id" , (req , res) => {
    let {id} = req.params;
    let post = posts.find( (p) => id === p.id );
    console.log(id);
    res.render("show.ejs" , {post})
});

app.get("/posts/:id/edit" , (req , res) => {
    let { id } = req.params;
    let post = posts.find( (p) => id === p.id );
    console.log(post.id)
    res.render("edit.ejs", {post})
});
app.patch("/posts/:id" , (req , res) => {
    let {id} = req.params;
    let age_ = req.body.age;
    let post = posts.find( (p) => id === p.id );
    post.age = age_;
    console.log(post)
    res.send("patch request working!");
})


app.listen(port, () => {
    console.log(`listening port : ${port}`);
});