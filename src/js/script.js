var prompt = require("prompt-sync")();
// var prompt = ps({ sigint: true });
var tasks = [];

function Task(name, status, id) {
  this.name = name;
  this.status = status;
  this.id = id;
}

function addTask(name, status) {
  var name, status;
  name = prompt("Digite o nome da Tarefa: ");
  status = prompt("Digite o status da Tarefa: ");
  id = tasks.length + 1;
  const task = new Task(name, status, id);
  tasks.push(task);
  return tasks;
}

function editTaskName(taskId, newName) {
  var taskId, newName;
  taskId = prompt("Digite o ID da Tarefa: ");
  const task = tasks.find((tasks) => tasks.id == taskId);
  if (task) {
    newName = prompt("Digite o novo nome da Tarefa: ");
    task.name = newName;
    return tasks;
  } else {
    console.log("Tarefa não encontrada!");
  }
}

function editTaskStatus(taskId, newStatus) {
  var taskId, newStatus;
  taskId = prompt("Digite o ID da Tarefa: ");
  const task = tasks.find((tasks) => tasks.id == taskId);
  if (task) {
    newStatus = prompt("Digite o novo status da Tarefa: ");
    task.status = newStatus;
    return tasks;
  } else {
    console.log("Tarefa não encontrada!");
  }
}

function removeTask(taskId) {
  var taskId;
  taskId = prompt("Digite o ID da Tarefa: ");
  const task = tasks.find((tasks) => tasks.id == taskId);
  if (task) {
    tasks.splice(taskId - 1, 1);
    return tasks;
  } else {
    console.log("Tarefa não encontrada!");
  }
}

function listTasks() {
  return tasks;
}

function getTaskById(taskId) {
  var taskId;
  taskId = prompt("Digite o ID da Tarefa: ");
  return (this.task = tasks.find((tasks) => tasks.id == taskId));
}

addTask();
addTask();
editTaskName();
editTaskStatus();
removeTask();
listTasks();
getTaskById();
