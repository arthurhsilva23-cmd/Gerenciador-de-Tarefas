const apiUrl = "http://localhost:3000/tasks";

const form = document.getElementById("Task-form");
const taskList = document.getElementById("task-List");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });

if(!res.ok) throw new Error("Erro ao adicionar tarefa")

const task = await res.json();
form.reset();
addTaskToUl(task);

  } catch(err){

    alert("Erro ao salvar tarefa:" + err.message);
  }

  });

function addTaskToUl(task){
const li = document.createElement("li");
li.className = task.completed ? "completed" : "";
li.immerHtml = `
<span>${task.title} - ${task.description}</span>
<div>

<button class="li-button" onclick="toggleComplete(${task.completed})">✅</button>

<button class="li-button" onclick="deleteTask(${task.id})">🗑️</buttom>

`;
taskList.appendChild(li);

}

async function loadTasks(){
try {

    const res = await fetch(apiUrl);
if(!res.ok) throw new Error("Erro ao carregar tarefas");
const tasks = await res.json();
taskList.immerHtml = "";
tasks.forEach(addTaskToUl)

} catch (err){
   alert("erro ao carregar tarefas:" + err.message);
}

}

async function toggleComplete(id, completed){
try{
await fetch(`${apiUrl}/$(id)`) , {
method: "PUT", 
headers: {"Content-Type": "aplication/json"},
body:JSON.stringify({completed: !completed})

};

loadTasks();

} catch(err){

alert("Erro ao atualizar tarefa:" + err.message);

}

}

async function deleteTask(id){
try{
await fetch(`${apiUrl}/$(id)` , {
method : "DELETE"
});

loadTasks();

} catch (error){

alert("Erro ao excluir a tarefa" + err.message);

}
}
  
loadTasks();







