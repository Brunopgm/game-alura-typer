$('#botao-placar').click(mostraPlacar)
$('#botao-sync').click(sincronizaPlacar)

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $('.select-usuarios').find('#usuarios').val()
    var numPalavras = $("#contador-palavras").text();
   
    var linha = novaLinha(usuario, numPalavras)
    linha.find('.botao-remover').click(removeLinha)

    corpoTabela.append(linha);

    $(".placar").slideDown(500)
    scrollPlacar()
}

function scrollPlacar(){
    var posicaoElemento = $(".placar").offset().top;
    $("html, body").animate({
        scrollTop:posicaoElemento+'px'
    }, 1000)
    
}




function novaLinha(usuario, numPalavras){
    var linha = $('<tr>');
    var colunaUsuario = $('<td>').text(usuario);
    var colunaPalavras = $('<td>').text(numPalavras);
    var colunaRemover = $('<td>');
    
 
    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    
    link.append(icone)
    colunaRemover.append(link)

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover)
    
    return linha
}

function removeLinha(event){
    event.preventDefault();
    let linha = $(this).parent().parent();
    linha.fadeOut(1000);
    linha.setTimeout((linha) => {
        linha.remove()
    }, 1000);
}


function mostraPlacar(){
    $('.placar').slideToggle(600)
}


function sincronizaPlacar() {
    var placar = [];
    
    
    var linha = $('tbody>tr')
    linha.each(function () {
        var usuario = $(this).find('td:nth-child(1)').text()
        var palavras = $(this).find('td:nth-child(2)').text()
        
        var score = {
            usuario: usuario,
            palavras: palavras
        }
        placar.push(score) 
              
    })

    var dados = {placar:placar}
    $.post('http://localhost:3000/placar', dados, function(){
        console.log('Dados salvos com sucesso');
        
    })
    
}




function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.palavras);
            console.log(this.usuario);
            

            //modificado aqui
            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}





