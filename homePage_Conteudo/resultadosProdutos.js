const resultadosProdutosDiv = document.getElementById("resultadosProdutosDivID"); 
const resultadosProdutosUl = document.getElementById("resultadosProdutosUlID"); 





let produtosLi = []; 
let produtosFoto = [] 
let produtosTexto = []; 
let produtosPreco = []; 
let produtosIcone = []; 
let produtosLojasNomes = []; 
let produtosLink = [] 


  for (let i = 0; i < 40; i++) {
    produtosLi[i] = document.createElement('li');
      produtosLi[i].className = "resultadosProdutosLi";

    produtosFoto[i] = document.createElement('img');
      produtosFoto[i].className = "resultadosProdutosLiImg";

    produtosTexto[i] = document.createElement('h1');
      produtosTexto[i].className = "liProdutosTitulos";

    produtosPreco[i] = document.createElement('h2');
      produtosPreco[i].className = "liProdutosPrecos";

    produtosIcone[i] = document.createElement('img');
      produtosIcone[i].className = "liProdutosIconesImagens";
  
    produtosLojasNomes[i] = document.createElement('p');
      produtosLojasNomes[i].className = "liProdutosLojasNomes";

    produtosLink[i] = document.createElement('a');
      produtosLink[i].className = "resultadosProdutosA";

    produtosLi[i].appendChild(produtosFoto[i]);
    produtosLi[i].appendChild(produtosTexto[i]); 
    produtosLi[i].appendChild(produtosPreco[i]);
    produtosLi[i].appendChild(produtosIcone[i]);
    produtosLi[i].appendChild(produtosLojasNomes[i]);

    produtosLink[i].appendChild(produtosLi[i]);

    resultadosProdutosUl.appendChild(produtosLink[i]);
  }





const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("query");

async function fetchProducts() {
  if (!searchQuery) return;

  try {
    document.title += ' ' + searchQuery;
    
    
    const response = await fetch(`api_search.php?q=${encodeURIComponent(searchQuery)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data); 

    
    if (data.shopping_results) {
      data.shopping_results.forEach((product, index) => {
        if (index < produtosFoto.length && produtosFoto[index] && produtosTexto[index]) {
          produtosFoto[index].src = product.thumbnail;
          produtosTexto[index].textContent = product.title;
          produtosPreco[index].textContent = product.price ? `${product.price}` : 'Preço não disponível!';
          produtosIcone[index].src = product.source_icon;
          produtosLojasNomes[index].textContent = product.source;
          produtosLink[index].href = product.product_link;
          produtosLink[index].target = "_blank";
          
          produtosLi[index].style.display = 'block';
        }
      });
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    
    resultadosProdutosUl.innerHTML = '<p style="color: red; text-align: center;">Erro ao carregar produtos. Por favor, tente novamente.</p>';
  }
}
document.addEventListener('DOMContentLoaded', fetchProducts);