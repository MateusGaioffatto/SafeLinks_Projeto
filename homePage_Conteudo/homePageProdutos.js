let produtosLi = []; // <= COMENTAR
let produtosTexto = []; // <= COMENTAR
// COMENTAR =>
  function modificarAnunciosDeProdutos(valor) {
  if (valor) {
    for (let i = 0; i < 40; i++) {
      produtosLi = document.createElement('li');
        produtosLi.className = "homePageProdutosLi";
      produtosTexto = document.createElement('p');
        produtosTexto.className = "liProdutosTitulos";
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
  const homePageProdutosUlLiTextos = document.querySelectorAll(".homePageProdutosUl p");
  const url = `http://localhost:3000/api/shopping?q=${encodeURIComponent(searchInputText)}`;

  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < homePageProdutosUlLi.length; i++) {
          homePageProdutosUlLi[i].style.backgroundImage = `url('${data.shopping_results[i].thumbnail}')`;
          homePageProdutosUlLiTextos[i].textContent = data.shopping_results[i].title;
        }
    })
    .catch(error => console.error('Erro ao buscar produtos:', error));
}

// Exporta as funções se precisar em outros módulos
window.mostrarImagensDosProdutos = mostrarImagensDosProdutos;
window.modificarAnunciosDeProdutos = modificarAnunciosDeProdutos;


