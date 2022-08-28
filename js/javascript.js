let dinheiro_investido_usuario = document.querySelector('p.dinheiro_investido_usuario')
let div_sair_erros = document.querySelector('div.div_sair_erros')

let saldo_atual = document.querySelector('div.saldo_atual')
let valor_adicionar = 10000
let dinheiro_total = 0 // Valor total na conta não investido
dinheiro_total = valor_adicionar

//Já começa com 10k na conta se o valor for 0
saldo_atual.innerHTML = 'R$'+`${dinheiro_total}`+',00'


let div_adicionar_investimento = document.querySelector('div.div_adicionar_investimento')
let investido_total = 0 // Investimento do usuário


let valor_input_adicionar = document.querySelector('input.valor_adicionar')

function adicionarDinheiro() {//Para abrir uma aba
    if(div_adicionar_investimento.style.display == 'inline-flex') {
        div_adicionar_investimento.style.display = 'none'
    }else {
        div_adicionar_investimento.style.display = 'inline-flex'
    }
}

function adicionarNovoInvestimento() {
    div_retirar_investimento.style.display = 'none'
    let valor_input_formatado = valor_input_adicionar.value
    if(valor_input_formatado == '') {
        div_sair_erros.innerHTML = `
        <p class="saida_erro_adicionar">
            Campo vazio
        </p>`
    }else if(valor_input_formatado > dinheiro_total) {
        div_sair_erros.innerHTML = `
        <p class="saida_erro_adicionar">
            Saldo insuficiente
        </p>`
    }else {
        div_sair_erros.innerHTML = ''
        dinheiro_total = parseFloat(dinheiro_total) - parseFloat(valor_input_formatado)

        investido_total += parseFloat(valor_input_formatado)
        saldo_atual.innerHTML = 'R$'+`${dinheiro_total}`+',00'

        dinheiro_investido_usuario.innerHTML = 'R$'+`${investido_total}`+',00'

        alert('Transação concluida!')
        div_adicionar_investimento.style.display = 'none'
    }
}

let div_retirar_investimento = document.querySelector('div.div_retirar_investimento')
let valor_retirar = document.querySelector('input.valor_retirar')
let div_sair_erros_retirar = document.querySelector('div.div_sair_erros_retirar')

function retirarDinheiro() {
    if(div_retirar_investimento.style.display == 'inline-flex') {
        div_retirar_investimento.style.display = 'none'
    }else {
        div_retirar_investimento.style.display = 'inline-flex'
    }
}

function retirarInvestimento() {
    div_adicionar_investimento.style.display = 'none'
    let valor_retirar_formatado = valor_retirar.value
    if(valor_retirar_formatado == '') {
        div_sair_erros_retirar.innerHTML = `
        <p class="saida_erro_adicionar">
            Campo vazio
        </p>`
    }
    else if(valor_retirar_formatado > parseFloat(investido_total)) {
        div_sair_erros_retirar.innerHTML = `
        <p class="saida_erro_adicionar">
            Saldo insuficiente
        </p>`
    }else {
        div_sair_erros_retirar = ''
        dinheiro_total = parseFloat(dinheiro_total) + parseFloat(valor_retirar_formatado)
        investido_total -= parseFloat(valor_retirar_formatado)

        saldo_atual.innerHTML = 'R$'+`${dinheiro_total}`+',00'
        dinheiro_investido_usuario.innerHTML = 'R$'+`${investido_total}`+',00'
        alert('Transação concluida!')
        div_retirar_investimento.style.display = 'none'
    }
}

// Opcoes de invetimento

let btn_direto = document.querySelector('div#tesouro_direto')
let btn_selic = document.querySelector('div#tesouro_selic')

function aparecerOpcao_1() {
    if(btn_direto.style.display == 'flex') {
        btn_direto.style.display = 'none'
    }else {
        btn_direto.style.display = 'flex'
    }
}

function aparecerOpcao_2() {
    if(btn_selic.style.display == 'flex') {
        btn_selic.style.display = 'none'
    }else {
        btn_selic.style.display = 'flex'
    }
}

function opcaoRentabilidade(valor) {

    tempo_rentabilidade = setInterval(function(){
    investido_total = parseInt(investido_total) + (parseInt(investido_total) * valor / 100)
    dinheiro_investido_usuario.innerHTML = 'R$'+`${investido_total}`
    }, 2000)
}

function pararRentabilidade() {
    clearInterval(tempo_rentabilidade)
}
