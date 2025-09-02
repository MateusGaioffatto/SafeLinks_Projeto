// COMENTAR =>
function modificarAnunciosDeProdutos(valor) {
  if (valor) {
    for (let i = 0; i < 20; i++) {
      const produtosLi = document.createElement('li');
        produtosLi.className = "homePageProdutosLi";
      const produtosTexto = document.createElement('p');
        produtosTexto.className = "liProdutosTitulos";
        produtosTexto.textContent = "CONTEÚDO!"
        produtosLi.appendChild(produtosTexto);      
      homePageProdutosUl.appendChild(produtosLi);
    }
  }
  else {
    homePageProdutosUl.innerHTML = '';
  }
}

// COMENTAR =>
function mostrarImagensDosProdutos() {}

// Exporta as funções se precisar em outros módulos
window.mostrarImagensDosProdutos = mostrarImagensDosProdutos;
window.modificarAnunciosDeProdutos = modificarAnunciosDeProdutos;


