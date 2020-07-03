var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
    atualizaPlacar()

    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
    
    $('.tooltip').tooltipster({
            trigger:'custom'
            }); 
    
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}


function inicializaContadores() {
    campo.on("input",function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(" ").length;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    campo.one("focus", function() {
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                finalizaCronometro();
                clearInterval(cronometroID);
            }
        }, 1000);
    });
}   

function finalizaCronometro(){
        campo.attr("disabled", true);
        campo.toggleClass('campo-desativado')
        inserePlacar()
}



function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.toggleClass('campo-desativado')
    inicializaCronometro();
    campo.removeClass('borda-verde')
    campo.removeClass('borda-vermelha')    
}

function inicializaMarcadores(){
    campo.on("input", function() {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length)
        if(comparavel === digitado){
            campo.addClass('borda-verde')
            campo.removeClass('borda-vermelha')
        }else{
            campo.addClass('borda-vermelha')
            campo.removeClass('borda-verde')
        }
    });    
}


function atualizaTempoInicial(tempo){
    tempoInicial = tempo
    $('#tempo-digitacao').text(tempo)

}













// var campo = $('.campo-digitacao')
// campo.on('input', function(event){
//     let evento = event.target.value;
    
//     contaCaracteres(evento.length)
//     contaPalavras(evento.split(/\S+/).length - 1)
    
// })


// function contaCaracteres(qtdCaracteres){
//     $('#contador-caracteres').text(qtdCaracteres)
// }

// function contaPalavras(qtdPalavras){
//     $('#contador-palavras').text(qtdPalavras)
// }







