var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

var campo = $('.campo-digitacao')
campo.on('input', function(){
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\s+/).length - 1
    var qtdCaracteres = conteudo.length
    $('#contador-palavras').text(qtdPalavras)
    $('#contador-caracteres').text(qtdCaracteres)
    
    
})


var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function() {
    var cronometroID = setInterval(function() {
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if (tempoRestante < 1) {
            campo.attr("disabled", true);
            clearInterval(cronometroID);
        }
    }, 1000);
});




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