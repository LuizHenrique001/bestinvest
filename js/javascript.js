let dinheiro_investido_usuario = document.querySelector('p.dinheiro_investido_usuario')
let div_sair_erros = document.querySelector('div.div_sair_erros')

let saldo_atual = document.querySelector('div.saldo_atual')
let valor_adicionar = 10000
let dinheiro_total = 0 // Valor total na conta não investido
dinheiro_total = JSON.parse(localStorage.getItem('dinheiro_total'))
//dinheiro_total = valor_adicionar

//Já começa com 10k na conta se o valor for 0
saldo_atual.innerHTML = 'R$'+`${JSON.parse(localStorage.getItem('dinheiro_total')).toFixed(2).replace('.', ',')}`


let div_adicionar_investimento = document.querySelector('div.div_adicionar_investimento')
let investido_total = 0 // Investimento do usuário
investido_total = JSON.parse(localStorage.getItem('investido_total'))
dinheiro_investido_usuario.innerHTML = 'R$'+JSON.parse(localStorage.getItem('investido_total')).toFixed(2).replace('.', ',')


let valor_input_adicionar = document.querySelector('input.valor_adicionar')

function adicionarDinheiro() {//Para abrir uma aba
    if(div_adicionar_investimento.style.display == 'inline-flex') {
        div_adicionar_investimento.style.display = 'none'
    }else {
        div_adicionar_investimento.style.display = 'inline-flex'
        div_retirar_investimento.style.display = 'none'
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

        saldo_atual.innerHTML = 'R$'+`${dinheiro_total.toFixed(2).replace('.', ',')}`
        dinheiro_investido_usuario.innerHTML = 'R$'+`${investido_total.toFixed(2).replace('.', ',')}`
        if(JSON.parse(localStorage.getItem('dinheiro_total')) == 0 || NaN) {
            localStorage.setItem('dinheiro_total', dinheiro_total)
        }else {
            localStorage.setItem('dinheiro_total', dinheiro_total)
        }

        if(JSON.parse(localStorage.getItem('investido_total')) == 0 || NaN) {
            localStorage.setItem('investido_total', investido_total)
        }else {
            localStorage.setItem('investido_total', investido_total)
        }

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
        div_adicionar_investimento.style.display = 'none'
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

        saldo_atual.innerHTML = 'R$'+`${dinheiro_total.toFixed(2).replace('.', ',')}`
        dinheiro_investido_usuario.innerHTML = 'R$'+`${investido_total.toFixed(2).replace('.', ',')}`
        if(JSON.parse(localStorage.getItem('dinheiro_total')) == 0 || NaN) {
            localStorage.setItem('dinheiro_total', dinheiro_total)
        }else {
            localStorage.setItem('dinheiro_total', dinheiro_total)
        }

        if(JSON.parse(localStorage.getItem('investido_total')) == 0 || NaN) {
            localStorage.setItem('investido_total', investido_total)
        }else {
            localStorage.setItem('investido_total', investido_total)
        }
        alert('Transação concluida!')
        valor_retirar_formatado = ''
        div_retirar_investimento.style.display = 'none'
    }
}

// Opcoes de invetimento

let btn_direto = document.querySelector('div#tesouro_direto')
let btn_selic = document.querySelector('div#tesouro_selic')
let btn_ipca = document.querySelector('div#ipca')

function aparecerOpcao_1() {
    if(btn_direto.style.display == 'table') {
        btn_direto.style.display = 'none'
    }else {
        btn_direto.style.display = 'table'
    }
}

function aparecerOpcao_2() {
    if(btn_selic.style.display == 'table') {
        btn_selic.style.display = 'none'
    }else {
        btn_selic.style.display = 'table'
    }
}

function aparecerOpcao_3() {
    if(btn_ipca.style.display == 'table') {
        btn_ipca.style.display = 'none'
    }else {
        btn_ipca.style.display = 'table'
    }
}

function opcaoRentabilidadeDireto(valor) {
    tempo_rentabilidade_direto = setInterval(function(){
    investido_total = parseInt(investido_total) + (parseInt(investido_total) * valor / 100)
    dinheiro_investido_usuario.innerHTML = 'R$'+`${investido_total.toFixed(2).replace('.', ',')}`
    }, 2000)

    dinheiro_investido_usuario.style.color = 'rgb(0, 176, 0)'
}

function opcaoRentabilidadeSelic(valor) {
    tempo_rentabilidade_selic = setInterval(function(){
    investido_total = parseInt(investido_total) + (parseInt(investido_total) * valor / 100)
    dinheiro_investido_usuario.innerHTML = 'R$'+`${investido_total.toFixed(2).replace('.', ',')}`
    }, 2000)

    dinheiro_investido_usuario.style.color = 'rgb(0, 176, 0)'
}

function opcaoRentabilidadeIpca(valor) {
    tempo_rentabilidade_ipca = setInterval(function(){
        investido_total = parseInt(investido_total) + (parseInt(investido_total) * valor / 100)
        dinheiro_investido_usuario.innerHTML = 'R$'+`${investido_total.toFixed(2).replace('.', ',')}`
    }, 2000)
    dinheiro_investido_usuario.style.color = 'rgb(0, 176, 0)'
}

function pararRentabilidade(valor) {
    clearInterval(valor)
    dinheiro_investido_usuario.style.color = 'white'
}

//Botões enter e etc...
let confirmar_enter_adicionar = document.querySelector('a#confirmar_adicionar')
let confirmar_enter_retirar = document.querySelector('a#confirmar_retirar')
valor_input_adicionar.addEventListener('keyup', function(event) {
    if(event.keyCode === 13){
        event.preventDefault()
        confirmar_enter_adicionar.click()
    }
})


valor_retirar.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
        event.preventDefault()
        confirmar_enter_retirar.click()
    }
})

// Faturamento Usuário

let bloco_faturamento = document.querySelector('div.bloco_faturamento')
let faturamento_total = document.querySelector('p.faturamento_total')

let tesouro_direto_faturamento = 0
let tesouro_selic_faturamento = 0
let tesouro_ipca_faturamento = 0


function verFaturamento() {
    if(bloco_faturamento.style.display == 'none') {
        bloco_faturamento.style.display = 'flex'
    }else {
        bloco_faturamento.style.display = 'none'
    }
}


