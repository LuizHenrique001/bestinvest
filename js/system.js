$(function(){

    let dinheiroInvestido = $('.dinheiro_investido_usuario')
    let saldoConta = localStorage.getItem('saldoConta')
    let dinheiroInvestidoTotal = localStorage.getItem('dinheiroInvestido')

    // Funções do site

    function saldoAtualUser () {
        if(saldoConta == 0){
            saldoConta += 1000
            localStorage.setItem('saldoConta',saldoConta)
            $('.saldo_atual').text(`R$ ${saldoConta.toFixed(2).replace('.',',')}`)
        }else{
            $('.saldo_atual').text(`R$ ${parseFloat(saldoConta).toFixed(2).replace('.',',')}`)
        }
    }

    function investimentoUsuario () {
        if(dinheiroInvestidoTotal == 0){
            dinheiroInvestidoTotal += 0
            dinheiroInvestido.text(`R$ ${parseFloat(dinheiroInvestidoTotal).toFixed(2).replace('.',',')}`)
        }else {
            dinheiroInvestido.text(`R$ ${parseFloat(dinheiroInvestidoTotal).toFixed(2).replace('.',',')}`)
        }
    }

    function popUpTransacao() {
        setTimeout(function(){
            $('body').fadeIn(function(){
                $('body').append(`
                <div class="container_popup">
                    <div class="bloco_popup">
                        <h1>Transação concluida!</h1>
                    </div>
                    <div class="barra_popup"></div>
                </div>`)
            })
            $('.barra_popup').css('background-color','rgb(43, 255, 0)')
            $('.barra_popup').animate({
                'width': '100%'
            },3200)
        },500)

        setTimeout(function(){
            $('.container_popup').fadeOut()
            setTimeout(function(){
                $('.container_popup').remove()
            },500)
        },3500)
    }

    function popUpTransacaoErro(){
        setTimeout(function(){
            $('body').fadeIn(function(){
                $('body').append(`
                <div class="container_popup_erro">
                    <div class="bloco_popup">
                        <h1>Saldo insuficiente!</h1>
                    </div>
                    <div class="barra_popup"></div>
                </div>`)
            })
            $('.barra_popup').animate({
                'width': '100%'
            },3200)
        },500)

        setTimeout(function(){
            $('.container_popup_erro').fadeOut()
            setTimeout(function(){
                $('.container_popup_erro').remove()
            },500)
        },3500)
    }

    function inputLimit (){
        $('#add_dinheiro').keypress(function(){
            $(this).val(this.value.match(/^[0-9]*$/))
            $(this).keyup(function(){
                $(this).val(this.value.match(/^[0-9]*$/))
            })
        })

        $('#retirar_dinheiro').keypress(function(){
            $(this).val(this.value.match(/^[0-9]*$/))
            $(this).keyup(function(){
                $(this).val(this.value.match(/^[0-9]*$/))
            })
        })
    }

    inputLimit()
    saldoAtualUser()
    investimentoUsuario()

    $('.adicionar_dinheiro_btn').click(function(){
        if($('#label_add_dinheiro').css('display') == 'none') {
            $('#label_add_dinheiro').css('display', 'block')

            if($('#label_retirar_dinheiro').css('display') == 'block') {
                $('#label_retirar_dinheiro').css('display','none')
            }
        }else {
            $('#label_add_dinheiro').css('display', 'none')
        }
    })

    $('.retirar_dinheiro_btn').click(function(){
        if($('#label_retirar_dinheiro').css('display') == 'none') {
            $('#label_retirar_dinheiro').css('display', 'block')

            if($('#label_add_dinheiro').css('display') == 'block') {
                $('#label_add_dinheiro').css('display','none')
            }
        }else {
            $('#label_retirar_dinheiro').css('display', 'none')
        }
    })

    // Botões de ação

    $('#btn_add_investimento').click(function(){
        let inputAdd = $('#add_dinheiro').val()
        if(parseFloat(inputAdd) > saldoConta){
            popUpTransacaoErro()
        }else if(parseFloat(inputAdd) <= saldoConta) {
            saldoConta -= parseFloat(inputAdd)
            dinheiroInvestidoTotal = parseFloat(dinheiroInvestidoTotal) + parseFloat(inputAdd)

            localStorage.setItem('dinheiroInvestido',dinheiroInvestidoTotal)
            localStorage.setItem('saldoConta',saldoConta)

            popUpTransacao()
            investimentoUsuario()
            saldoAtualUser()
        }
    })

    $('#btn_retirar_investimento').click(function(){
        let inputRetirar = $('#retirar_dinheiro').val()
        if(parseFloat(inputRetirar) > dinheiroInvestidoTotal && (/[0-9]/)){
            popUpTransacaoErro()
        }else if(parseFloat(inputRetirar) <= dinheiroInvestidoTotal){
            saldoConta = parseFloat(saldoConta) + parseFloat(inputRetirar)
            dinheiroInvestidoTotal -= parseFloat(inputRetirar)

            localStorage.setItem('dinheiroInvestido',dinheiroInvestidoTotal)
            localStorage.setItem('saldoConta',saldoConta)

            popUpTransacao()
            investimentoUsuario()
            saldoAtualUser()
        }
    })
})