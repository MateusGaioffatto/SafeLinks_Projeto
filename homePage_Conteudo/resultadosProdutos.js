// CAMPO DE ANÚNCIOS E PRODUTOS: VARIÁVEIS CONSTANTES
const resultadosProdutosDiv = document.getElementById("resultadosProdutosDivID"); // VARIÁVEL CONSTANTE, DIV BOXES
const resultadosProdutosUl = document.getElementById("resultadosProdutosUlID"); // VARIÁVEL CONSTANTE, UL LIST

let produtosLi = []; // <= COMENTAR
let produtosFoto = [] // <= COMENTAR
let produtosTexto = []; // <= COMENTAR
// COMENTAR =>
  for (let i = 0; i < 40; i++) {
    produtosLi = document.createElement('li');
      produtosLi.className = "resultadosProdutosLi";

    produtosFoto = document.createElement('img');
      produtosFoto.className = "resultadosProdutosLiImg";
      produtosFoto.src = 'SafeLinks_Favicon_Logo.png';

    produtosTexto = document.createElement('p');
      produtosTexto.className = "liProdutosTitulos";

    produtosLi.appendChild(produtosFoto);
    produtosLi.appendChild(produtosTexto);      

    resultadosProdutosUl.appendChild(produtosLi);
  }
// }
// COMENTAR =>
function mostrarImagensDosProdutos(searchInputText) {
  const resultadosProdutosUlLi = document.querySelectorAll(".homePageProdutosUl li");
  const resultadosProdutosUlLiTextos = document.querySelectorAll(".homePageProdutosUl p");
  const url = `http://localhost:3000/api/shopping?q=${encodeURIComponent(searchInputText)}`;

  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < resultadosProdutosUlLi.length; i++) {
          resultadosProdutosUlLi[i].style.backgroundImage = `url('${data.shopping_results[i].thumbnail}')`;
          resultadosProdutosUlLiTextos[i].textContent = data.shopping_results[i].title;
        }
    })
    .catch(error => console.error('Erro ao buscar produtos:', error));
}

// Exporta as funções se precisar em outros módulos
window.mostrarImagensDosProdutos = mostrarImagensDosProdutos;
// window.modificarAnunciosDeProdutos = modificarAnunciosDeProdutos;


