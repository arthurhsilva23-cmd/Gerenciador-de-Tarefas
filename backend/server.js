const express = require("express");

const fs = require("fs");

const cors = require("cars");
const { title } = require("process");

const app = expresss();

const PORT = 3000;

app.use(cors());

app.use(express.json());

const FILE_PATH = "./tasks.json";





function readtasks() {

    if(!fs.existsSync(FILE_PATH)){
        fs.writefileSync(FILE_PATH, "[]")
    }
return JSON.parse(fs.readFileSync(FILE_PATH));
}

function writetasks(tasks){

fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));

}

//Definição de rotas da API(Endpoints)

//GET Lista tarefas(todas)

app.get("/tasks", (req, res) => {
    res.json(readtasks());
});
 

//GET /tasks id (Buscar informação)
app.get("/tasks/:id", (req, res) =>{

    const tasks = readtasks();
    const task = tasks.find(t=> t.id == req.pparams.id);
task ? res.json(task) : res.status(404).json({message:"taks not found"});

})

//POST /tasks (Criar nova tarefa)

app.post("/tasks",(req, res) =>{
const tasks = readtasks();
const newtask = {
id:Date.now(), 
title:req.body.title,
description: req.body.description || "",
completed: false
};
tasks.push(newtask);
writetasks(tasks);
res.status(201).json(newtask);
})

// PUT /taks/:id (Atualizar tarefa existente)
app.put("/taks/:id", (req, res) => {
const taks = readtasks();
const taksIndex = tasks.findIndex(t=> t.id == req.params.id);

if(taksIndex == -1) return





})


//DELETE /taks/id (Excluir tarefa)


app.delete("/tasks/id", (req, res) => {
    let tasks = readtasks();

    tasks = tasks.filter(t => t.id != req.params.id);
    writetasks(tasks);
    res.status(204).send();
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`) );










