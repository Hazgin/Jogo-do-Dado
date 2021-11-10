'use strict';

// Variáveis para selecionar elementos
const pontos0El = document.querySelector("#pontos-0")
const pontos1El = document.getElementById("pontos-1")
const atual0El = document.getElementById("atual-0")
const atual1El = document.getElementById("atual-1")
const dadoEl = document.querySelector('.dado')
const botaoN = document.querySelector(".botao-novo")
const botaoR = document.querySelector(".botao-rolar")
const botaoS = document.querySelector(".botao-segurar")
const jog0El = document.querySelector(".jogador-0")
const jog1El = document.querySelector(".jogador-1")
const xisEl = document.querySelector(".xis")
const modal = document.querySelector(".modal")
const fundo = document.querySelector(".tela")

//Condições de início
pontos0El.textContent = 0
pontos1El.textContent = 0
dadoEl.classList.add("escondido")
let pontuacao = [0, 0]
let pontosA = 0
let jogAtivo = 0
let jogando = true

//Funções:
//Passar a vez:
const passarVez = function () {
    document.getElementById(`atual-${jogAtivo}`).textContent = 0
    pontosA = 0
    jogAtivo = jogAtivo == 0 ? 1 : 0;
    jog0El.classList.toggle("jogador-ativo")
    jog1El.classList.toggle("jogador-ativo")
}

//Fazendo o dado rolar
const rolar = function () {
    if (jogando == true) {
        //Gerando o número aleatório
        const dado = Number(Math.floor(Math.random() * 6) + 1)
        
        //Mostrando o dado
        dadoEl.classList.remove("escondido")
        dadoEl.src = `d6-${dado}.png`
        
        //Comparando e quantificando os resultados
        if (dado != 1) {
            //Adicionar número rolado à pontuação atual
            pontosA += dado
            document.getElementById(`atual-${jogAtivo}`).textContent = pontosA
        } else {
            //Apagar pontuação atual e passar a vez
            passarVez()
        }
    }
}

//Segurar valor:
const segurar = function () {
    if (jogando == true) {
        //Adicionar pontuação atual ao total de pontos do jogador
        pontuacao[jogAtivo] += pontosA //EX: pontuação[1].nova = pontuação[1].antiga + pontosA 
        document.getElementById(`pontos-${jogAtivo}`).textContent = pontuacao[jogAtivo]
        
        //checar se o jogador tem mais de 100 pontos no total
        if (pontuacao[jogAtivo] >= 100) {
        //Se tiver, terminar o jogo
            jogando = false
            document.querySelector(`.jogador-${jogAtivo}`).classList.add("jogador-vencedor")
            document.getElementById(`mensagem-${jogAtivo}`).classList.remove("escondido")
            document.querySelector(`.jogador-${jogAtivo}`).classList.remove("jogador-ativo")
            dadoEl.classList.add("escondido")
        } else {
        //Trocar o jogador
            passarVez() 
        }
    }
}

//Novo jogo:
const novoJogo = function () {
    init()
}


//Atribuições:
//Essa faz o dado rolar:
botaoR.addEventListener("click", rolar)
document.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        rolar()
    }
})

//Essa segura o valor:
botaoS.addEventListener("click", segurar)
document.addEventListener("keyup", function (e) {
    if (e.key == " ") {
        segurar()
    }
})

//Essa reinicia o jogo:
botaoN.addEventListener("click", novoJogo)
document.addEventListener("keyup", function (e) {
    if (e.key == "Backspace") {
        novoJogo()
    }
})

const init = function () {
    jogando = true
    pontos0El.textContent = 0
    pontos1El.textContent = 0
    atual0El.textContent = 0
    atual1El.textContent = 0
    dadoEl.classList.add("escondido")
    pontuacao = [0, 0]
    pontosA = 0
    jogAtivo = 0
    document.querySelector(`.jogador-0`).classList.remove("jogador-vencedor")
    document.querySelector(`.jogador-1`).classList.remove("jogador-vencedor")
    document.getElementById(`mensagem-0`).classList.add("escondido")
    document.getElementById(`mensagem-1`).classList.add("escondido")
    document.querySelector(`.jogador-0`).classList.add("jogador-ativo")
    document.querySelector(`.jogador-1`).classList.remove("jogador-ativo")
}

const fecharM = function () {
    modal.classList.toggle('escondido')
    fundo.classList.toggle('escondido')
}

xisEl.addEventListener("click", fecharM)
fundo.addEventListener("click", fecharM)
