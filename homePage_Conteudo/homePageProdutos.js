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
function mostrarImagensDosProdutos(searchInputText) {
  const homePageProdutosUlLi = document.querySelectorAll(".homePageProdutosUl li");
  const url = `http://localhost:3000/api/shopping?q=${encodeURIComponent(searchInputText)}`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < homePageProdutosUlLi.length; i++) {
          homePageProdutosUlLi[i].style.backgroundImage = `url('${data.shopping_results[i].thumbnail}')`;
        }
    })
    .catch(error => console.error('Erro ao buscar produtos:', error));
}

// Exporta as funções se precisar em outros módulos
window.mostrarImagensDosProdutos = mostrarImagensDosProdutos;
window.modificarAnunciosDeProdutos = modificarAnunciosDeProdutos;


