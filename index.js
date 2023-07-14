//imports

const express = require("express");

//prisma es el orm
const PrismaClient = require("@prisma/client").PrismaClient;


const prisma = new PrismaClient();

const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
//////////////////////////////////////////////////////

//iniciar app y config
const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//////////////////////////////////////////////////////


//rutas
app.get("/", async (req, res) => {
    //query con orm
    const todos = await prisma.todo.findMany();

    //tira la VISTA + datos
    res.render("home", { todos });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/", async (req, res) => {
    
    const newTodo = await prisma.todo.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
        },
    });

    res.redirect("/");
});

//GET BY ID
app.get("/:id", async (req, res) => {
    // console.log("get todo");
    const { id } = req.params;

    const todo = await prisma.todo.findUnique({
        where: {
            id,
        },
    });
    if (!todo) return;
    res.render("show", { todo });
});



app.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
        where: {
            id,
        },
    });
    res.render("edit", { todo });
});

//UPDATE BY ID
app.put("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.todo.update({
        where: {
            id,
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            state: req.body.state,
            priority: req.body.priority,
        },
    });
    res.redirect("/");
});

//delete todo
app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.todo.delete({
        where: {
            id,
        },
    });
    res.redirect("/");
});

///////////////////////////////////////////////////


//iniciar servidor
app.listen(3000, () => {
    console.log("Server running http://localhost:3000");
});
