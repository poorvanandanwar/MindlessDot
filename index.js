import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port =3000;
let posts=[{
    date:27,
    month:5,
    year:2024,
    time:'12:04:57 pm',
    id: '1719470126147',
    title:'Embracing Minimalism: How Less Can Be More',
    content:'Minimalism is a lifestyle choice that emphasizes simplicity and intentionality. It’s about stripping away the excess and keeping only what adds value to your life. This doesn’t just apply to physical possessions but also to your mental space, relationships, and activities.'
},
    {
        date: 27,
        month: 5,
        year: 2024,
        time: '12:08:56 pm',
        id: '1719470432437',
        title: 'The Art of Mindful Living: Finding Peace in the Present Moment',
        content: 'Mindful living is about being fully present and engaged in the here and now. It is a practice rooted in mindfulness, which involves paying attention to our thoughts, feelings, and surroundings without judgment. By cultivating this awareness, we can find greater peace and contentment in our daily lives.'
      }
];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get("/",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/add",(req,res)=>{
    res.render("new.ejs");
});
const today=new Date();
app.post("/add",(req,res)=>{
    const newPost={
        date:today.getDate(),
        month:today.getMonth(),
        year:today.getFullYear(),
        time:today.toLocaleTimeString(),
        id:Date.now().toString(),
        title:req.body.title,
        content:req.body.content
    };
    posts.push(newPost);
    console.log(posts);
    res.redirect("/");
});
app.get("/:id/edit",(req,res)=>{
    const post=posts.find(p=>p.id===req.params.id);
    res.render("edit.ejs",{post});
})
app.put("/:id",(req,res)=>{
    const post=posts.find(p=>p.id===req.params.id);
    
    post.title=req.body.title;
    post.content=req.body.content;
    res.redirect("/");
});
app.delete("/:id",(req,res)=>{
    posts=posts.filter(p=>p.id!==req.params.id);
    res.redirect("/");
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});