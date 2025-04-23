const botao = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

var lista = []

function adicionarTarefa(){
    if(input.value.trim() === ''){
        alert('Por favor, insira uma tarefa antes de adicionar!')
        return
    }

    lista.push({
        tarefa: input.value ,
        concluida: false
    })
    input.value = ''
    mostrarTarefas()
}

function mostrarTarefas(){
    let novaLi = ''
    lista.forEach( (item, posicao) =>{
        novaLi =  novaLi + 
           `<li class="task ${item.concluida && "done"}">
                <img src="./img/checked.png" alt="checked" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="trash" onclick="deletarItem(${posicao})">
            </li>`
    })

    listaCompleta.innerHTML = novaLi
    localStorage.setItem('list', JSON.stringify(lista))
}

function concluirTarefa(posicao){
    lista[posicao].concluida = !lista[posicao].concluida
    mostrarTarefas()
}

function deletarItem(posicao){
    lista.splice(posicao, 1)
    mostrarTarefas()
}

function recarregarItems(){
    const tarefasLS = localStorage.getItem('list')

    if(tarefasLS){
        lista = JSON.parse(tarefasLS)
    }
    
    mostrarTarefas()
}

recarregarItems()
botao.addEventListener('click', adicionarTarefa)
