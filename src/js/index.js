function enviaTarefa() {
  const input = document.getElementById("input")
  const lista = document.getElementById("lista")

  if (input.value !== "" && input.value !== null && input.value !== undefined) {
    const novaTarefa = document.createElement("li")
    novaTarefa.innerText = input.value

    const btn = document.createElement("button")
    btn.innerText = "x"
    btn.onclick = function () {
      lista.removeChild(novaTarefa)
    }

    novaTarefa.appendChild(btn)
    lista.appendChild(novaTarefa)
    input.value = ""
  }
}
