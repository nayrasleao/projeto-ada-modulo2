const input = document.getElementById("input")
const lista = document.getElementById("lista")


function enviaTarefa() {
  if (input.value !== "" && input.value !== null && input.value !== undefined) {
    const li = document.createElement("li")
    li.innerText = input.value

    const btn = document.createElement("button")
    btn.innerText = "x"
    btn.onclick = function () {
      lista.removeChild(li)
    }
    
    li.appendChild(btn)
    lista.appendChild(li)
    input.value = ""
  } else alert('Digite uma tarefa válida')
}

input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    enviaTarefa()
  }
});