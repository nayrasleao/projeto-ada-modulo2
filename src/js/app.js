var tasks = []

function Task(name, status, id) {
  this.name = name
  this.status = status
  this.id = id
}

function addTask() {
  var name = document.getElementById("inputName").value.trim();
  var status = "Em andamento";

  if (name && status) {
    // Verifica se a tarefa já existe pelo nome
    const tarefaExiste = tasks.find(task => task.name.toLowerCase() === name.toLowerCase());

    if (tarefaExiste) {
      alert("Essa tarefa já existe na lista.");
    } else {
      var id = tasks.length + 1;
      const task = new Task(name, status, id);
      tasks.push(task);
      updateTaskList();
      document.getElementById("inputName").value = "";
    }
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}


function editTaskName(taskId) {
  const task = tasks.find((task) => task.id == taskId)
  if (task) {
    var newName = prompt("Digite o novo nome da Tarefa: ")
    if (newName !== null && newName.trim() !== "") {
      task.name = newName
      updateTaskList()
    } else {
      alert("O novo nome da tarefa não pode ser vazio.")
    }
  }
}

function editTaskStatus(taskId) {
  var task = tasks.find((task) => task.id === taskId)
  if (task) {
    var statusSelect = document.getElementById(`statusSelect_${taskId}`)
    var newStatus = statusSelect.options[statusSelect.selectedIndex].value
    task.status = newStatus
    updateTaskList()
  } else {
    alert("Ops! Algo de errado aconteceu!")
  }
}

function removeTask(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id == taskId)
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1)
    updateTaskList()
  } else {
    alert("Tarefa não encontrada!")
  }
}

function listTasks() {
  updateTaskList()
}

function getTaskByIdOrName() {
  var nameOrId = document.getElementById("inputId").value.trim()
  
  if (!isNaN(nameOrId) && nameOrId !== '') {
    const task = tasks.find((task) => task.id == nameOrId)
  
    if (task) {
      alert(`Tarefa encontrada: ${task.id} - ${task.name}, ${task.status}`)
    } else {
      alert("Tarefa não encontrada!")
    }
  } else {

//precisei mudar o input no html pq se não for number ele procura pelo nome
    const searchTerm = nameOrId.toLowerCase()
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm))
  
    if (filteredTasks.length > 0) {
      var searchResult = "Tarefas encontradas com o nome '" + searchTerm + "':\n\n"
      filteredTasks.forEach(task => {
        searchResult += `${task.id} - ${task.name}, ${task.status}\n`
      })
      alert(searchResult)
    } else {
      alert(`Nenhuma tarefa encontrada com o nome '${searchTerm}'.`)
    }
  }
}


function updateTaskList() {
  var taskList = document.getElementById("taskList")
  taskList.innerHTML = ""

  tasks.forEach(function (task) {
    var li = document.createElement("li")

    if (task.status === "Concluído") {
      li.classList.add("concluido")
    } else if (task.status === "Atrasado") {
      li.classList.add("atrasado")
    }
    li.innerHTML = `
    <div>
      <span>${task.id} - ${task.name}, ${task.status}</span>
    </div>
    <div>
      Status: <select class="" id="statusSelect_${task.id}" onchange="editTaskStatus(${task.id})">
        <option value="Em Andamento" ${task.status === "Em Andamento" ? "selected" : ""}>Em Andamento</option>
        <option value="Atrasado" ${task.status === "Atrasado" ? "selected" : ""}>Atrasado</option>
        <option value="Concluído" ${task.status === "Concluído" ? "selected" : ""}>Concluído</option>
      </select>
      <button class="btn" onclick="editTaskName(${task.id})">Editar Nome</button>
      <button class="btn" onclick="removeTask(${task.id})">Remover</button>
    </div>
    `
    taskList.appendChild(li)
  })

  saveTasksToLocalStorage()
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

window.addEventListener("DOMContentLoaded", function () {
  var tarefasSalvas = localStorage.getItem("tasks")
  if (tarefasSalvas) {
    tasks = JSON.parse(tarefasSalvas)
    updateTaskList()
  }
})

document.getElementById("addTaskBtn").addEventListener("click", addTask)
document.getElementById("listTasksBtn").addEventListener("click", listTasks)
document.getElementById("getTaskByIdOrNameBtn").addEventListener("click", getTaskByIdOrName)