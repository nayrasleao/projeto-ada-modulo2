const input = document.getElementById("input");
const lista = document.getElementById("lista");

//aqui salva a lista no socalStorage
function salvarLista() {
  const tarefas = [];
  lista.querySelectorAll("li").forEach((tarefa) => {
    tarefas.push(tarefa.innerText);
  });
  localStorage.setItem("listaTarefas", JSON.stringify(tarefas));
}

// aqui carrega a lista do LocalStorage na pagina, se tiver
window.onload = function () {
  if (localStorage.getItem("listaTarefas")) {
    const tarefasSalvas = JSON.parse(localStorage.getItem("listaTarefas"));
    tarefasSalvas.forEach((tarefa) => {
      const li = document.createElement("li");
      li.innerText = tarefa;

      const btn = document.createElement("button");
      btn.innerText = "x";
      btn.onclick = function () {
        lista.removeChild(li);
        salvarLista();
      };

      li.appendChild(btn);
      lista.appendChild(li);
      input.value = "";
    });
  }
};

function enviaTarefa() {
  if (input.value !== "" && input.value !== null && input.value !== undefined) {
    const li = document.createElement("li");
    li.innerText = input.value;

    const btn = document.createElement("button");
    btn.innerText = "x";
    btn.onclick = function () {
      lista.removeChild(li);
      salvarLista();
    };

    li.appendChild(btn);
    lista.appendChild(li);
    input.value = "";

    salvarLista();
  } else {
    alert("Digite uma tarefa válida");
  }
}
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    enviaTarefa();
  }
});
