let dinheiro_investido_usuario = document.querySelector('p.dinheiro_investido_usuario')
let div_sair_erros = document.querySelector('div.div_sair_erros')

let saldo_atual = document.querySelector('div.saldo_atual')

let dinheiro_total = 0 // Valor total na conta não investido
let valor_adicionar = 10000

dinheiro_total = valor_adicionar//Já começa com 10k na conta
saldo_atual.innerHTML = 'R$'+`${dinheiro_total}`+',00'

let div_adicionar_investimento = document.querySelector('div.div_adicionar_investimento')
let investido_total = 0 // Investimento do usuário
dinheiro_investido_usuario.innerHTML = 'R$'+`${JSON.
    parse(localStorage.getItem('investido'))}`+',00'

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
        JSON.stringify(localStorage.setItem('investido', investido_total))
        saldo_atual.innerHTML = 'R$'+`${dinheiro_total}`+',00'
        dinheiro_investido_usuario.innerHTML = 'R$'+`${JSON.
            parse(localStorage.getItem('investido'))}`+',00'

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
    else if(valor_retirar_formatado > investido_total) {
        div_sair_erros_retirar.innerHTML = `
        <p class="saida_erro_adicionar">
            Saldo insuficiente
        </p>`
    }else {
        div_sair_erros_retirar = ''
        dinheiro_total = parseFloat(dinheiro_total) + parseFloat(valor_retirar_formatado)
        investido_total = parseFloat(JSON.
            parse(localStorage.getItem('investido'))) - parseFloat(valor_retirar_formatado)
        saldo_atual.innerHTML = 'R$'+`${dinheiro_total}`+',00'
        dinheiro_investido_usuario.innerHTML = 'R$'+`${}`+',00'
        alert('Transação concluida!')
        div_retirar_investimento.style.display = 'none'
    }
}