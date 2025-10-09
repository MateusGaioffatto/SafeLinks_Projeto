// CAMPO DE PESQUISA: VARIÁVEIS CONSTANTES
const searchInput = document.getElementById("searchInputId");
const searchButton = document.getElementById("searchButtonId");

const homePageSearchIcon = document.getElementById("searchButtonIcon");





// LIMPAR TEXTO INSERIDO: VARIÁVEL CONSTANTE, BUTTON
const limparTexto = document.getElementById("limparTexto");
// HISTÓRICO DE PESQUISA: VARIÁVEL CONSTANTE: BUTTON
const acessarHistorico = document.getElementById("acessarHistorico");

// CAMPO DE PESQUISAS RECENTES: VARIÁVEL CONSTANTE, DIV
const pesquisasRecentes = document.getElementById("pesquisasRecentesId");
// CAMPO DE PESQUISAS RECENTES, ITEMS PESQUISADOS: VARIÁVEL CONSTANTE, DIV
const listaPesquisasRecentes = document.getElementById("pesquisasRecentesItemsId");

// TEXTO INSERIDO PELO USUÁRIO: VARIÁVEL
let searchInputText = '';

// LOJAS FAVORITADAS PELO USUÁRIO: VARIÁVEL
let favoriteStores = JSON.parse(localStorage.getItem('favoriteStores')) || {}; // <= RESOLVER ISSO NO BACKEND
// HISTÓRICO DE PESQUISA DO USUÁRIO: VARIÁVEL
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // <= RESOLVER ISSO NO BACKEND










// MENU HAMBURGUER: VARIÁVEIS
const menuHamburguerElemento = document.getElementById("menuHamburguerElementoId");
const navBarLinks = document.getElementById("navBarLinksId");
const homePageWindowLargura = window.matchMedia("(max-width: 768px)");
let navBarClickContagem = 0;

// MENU HAMBURGUER: FUNÇÕES
menuHamburguerElemento.addEventListener("click", () => { 
  navBarClickContagem++;
  if (navBarClickContagem === 1) {navBarLinks.style.opacity = 1;}
  else {
    navBarLinks.style.opacity = 0; 
    navBarClickContagem = 0;
  }
});
homePageWindowLargura.addEventListener("change", () => {
  if (!homePageWindowLargura.matches) {
      navBarLinks.style.opacity = 1;
      navBarClickContagem = 0;
  }
  else {navBarLinks.style.opacity = 0;}
});