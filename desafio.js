const reciboDeVenda = 'régua/valor3=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;estojo/valor8=cupom0;cola/valor4=cupom0;cola/valor4=cupom0;mochila/valor50=cupom10;lápis/valor0.5=cupom0;cola/valor4=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;tesoura/valor5=cupom0;caneta/valor1=cupom0;cola/valor4=cupom0;estojo/valor8=cupom0;borracha/valor2=cupom0;caderno/valor15=cupom5;lápis/valor0.5=cupom0;lápis/valor0.5=cupom0;tesoura/valor5=cupom0;'

let listaDaVenda = reciboDeVenda.split(';');
let novaLista = [];
listaDaVenda.forEach(item => {
    if (item.length > 0) {
        let partesBarra = item.split('/'); 
        let produtoNome = partesBarra[0].charAt(0).toUpperCase() + partesBarra[0].slice(1);

        let partesDoIgual = partesBarra[1].split('=');

        let valor = parseFloat(partesDoIgual[0].replace('valor', ''));
        let cupom = parseFloat(partesDoIgual[1].replace('cupom', ''));

        let itemExistente = novaLista.find(itens => itens.produto === produtoNome);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            novaLista.push(
                {
                    produto: produtoNome, 
                    valor: valor,
                    cupom: cupom, 
                    quantidade: 1, 
                }
            );
        }

    }

});

let quantidadeTotal = 0;
let semDesconto = 0;
let comDesconto = 0;
for (let itens in novaLista) {

    comDesconto += (novaLista[itens].valor - (novaLista[itens].valor * (novaLista[itens].cupom / 100))) * novaLista[itens].quantidade;
    
    semDesconto += novaLista[itens].valor * novaLista[itens].quantidade;
   

    quantidadeTotal += novaLista[itens].quantidade;
}

const totais = {
    valorTotal: semDesconto, 
    valorTotalDesconto: comDesconto, 
    quantidadeDeProdutos: quantidadeTotal, 
}

console.log(totais);
novaLista.sort((a,b) => a.valor - b.valor)
console.log(novaLista);