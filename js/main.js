// constantes basicas para a formacao desse codigo, por isso ficaram em cima
const form = document.getElementById("novoItem")  
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []


itens.forEach ( (elemento) => {
    criaElemento(elemento)
})



form.addEventListener("submit", (evento) => {
    evento.preventDefault()
// constante nome e quantidade precisam ficar em cima para o resto do codigo funcionar
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    const existe = itens.find( elemento => elemento.nome === nome.value )

// "if" pergunta ao codigo se aquele elemento existe e o "else" e pra caso ele n exista
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }
        
    
    

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
    
})

// funcao criaElemento que cria os objetos na pagina
function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.dataset.id = item.id
    numeroItem.innerHTML = item.quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeletar(item.id))

    lista.appendChild(novoItem)

    
}
//funcao q atualiza o elemento no localStorage
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}
// funcao q cria o botao de deletar
function botaoDeletar(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "x"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })


    return elementoBotao
}
// funcao q deleta o elemento
function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}