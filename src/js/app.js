var tasks = []

function Task(name, status, id) {
  this.name = name
  this.status = status
  this.id = id
}

function addTask() {
  var name = document.getElementById("inputName").value
  var status = "Em andamento"

  if (name && status) {
    var id = tasks.length + 1
    const task = new Task(name, status, id)
    tasks.push(task)
    updateTaskList()
    document.getElementById("inputName").value = ""
  } else {
    alert("Por favor, preencha todos os campos.")
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
    // Obtém o valor selecionado do menu suspenso
    var statusSelect = document.getElementById(`statusSelect_${taskId}`)
    var newStatus = statusSelect.options[statusSelect.selectedIndex].value

    // Atualiza o status da tarefa
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

function getTaskById() {
  var taskId = document.getElementById("inputId").value
  const task = tasks.find((task) => task.id == taskId)

  if (task) {
    alert(`Tarefa encontrada: ${task.id} - ${task.name}, ${task.status}`)
  } else {
    alert("Tarefa não encontrada!")
  }
}

function updateTaskList() {
  var taskList = document.getElementById("taskList")

  // Limpa a lista antes de adicionar as tarefas atualizadas
  taskList.innerHTML = ""

  // Itera a lista de tarefas e adiciona item a item
  tasks.forEach(function (task) {
    var li = document.createElement("li")

    // Adiciona classes com base no status da tarefa
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
<!-- Modificação: Adiciona um menu suspenso (select) para o status -->
        Status: <select class="" id="statusSelect_${
          task.id
        }" onchange="editTaskStatus(${task.id})">
          <option value="Em Andamento" ${
            task.status === "Em Andamento" ? "selected" : ""
          }>Em Andamento</option>
          <option value="Atrasado" ${
            task.status === "Atrasado" ? "selected" : ""
          }>Atrasado</option>
          <option value="Concluído" ${
            task.status === "Concluído" ? "selected" : ""
          }>Concluído</option>
        </select>
            <button class="btn" onclick="editTaskName(${
              task.id
            })">Editar Nome</button>
            <button class="btn" onclick="removeTask(${
              task.id
            })">Remover</button>
        </div>
        `
    taskList.appendChild(li)
  })
}

// Adicione event listeners aos botões e inputs
document.getElementById("addTaskBtn").addEventListener("click", addTask)
document.getElementById("listTasksBtn").addEventListener("click", listTasks)
document.getElementById("getTaskByIdBtn").addEventListener("click", getTaskById)
