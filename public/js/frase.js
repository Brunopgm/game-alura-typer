$("#botao-frase").click(fraseAleatoria)
$("#botao-frase-id").click(buscaFrase)
$('#frase-id').val('1')



function fraseAleatoria() {
    $('#spinner').toggle()
    $.get('http://localhost:3000/frases', trocaFraseAleatoria).fail(function () {
        $('#erro').show()
        $('#erro').fadeOut(2500)
        setTimeout(() => {
            $('#erro').toggle()
        }, 2500);
    }).always(function () {
        $('#spinner').toggle()
    })
}

function trocaFraseAleatoria(data) {
    var frase = $('.frase');
    var numAleatorio = Math.trunc(Math.random()*data.length)
    frase.text(data[numAleatorio].texto)
    atualizaTamanhoFrase()
    atualizaTempoInicial(data[numAleatorio].tempo)
    reiniciaJogo()
    
}



function buscaFrase(){
    var fraseId = $('#frase-id').val()
    var objetoIdFrase = {id: fraseId}
    $('#spinner').toggle()
    
    $.get('http://localhost:3000/frases', objetoIdFrase,  trocaFrase).fail(function () {
        $('#erro').show()
        $('#erro').fadeOut(2500)
        setTimeout(() => {
            $('#erro').hide()
        }, 2500);
    }).always(function(){
        $('#spinner').toggle()
    })
}

function trocaFrase(dados){
    $('.frase').text(dados.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(dados.tempo)
    reiniciaJogo()
    
}