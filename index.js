import express from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";

const app= express();


import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
   console.log("server is running on port "+port);
});


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride('_method'));


app.get("/",(req,res)=>{
    res.send("welcome");
});

let posts=[
    {
        id:uuidv4(),
        username:"joh",
        content:"hello world"
    },
    {
        id:uuidv4(),
        username:"doe",
        content:"hi there"
    },
    {
        id:uuidv4(),
        username:"alice",
        content:"good morning"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
   let {username,content} = req.body;
   let id= uuidv4();
   posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}= req.params;
    console.log("Clicked id:", id);
    let post = posts.find((p)=>id===String(p.id));
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
   let {id}= req.params;
   let newcontent=req.body.content;
   let post = posts.find((p)=>id===String(p.id));
   post.content=newcontent;
   res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===String(p.id));
    res.render("edit.ejs",{post});

});

app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
     posts = posts.filter((p)=>id!==String(p.id));
     res.redirect("/posts");
});