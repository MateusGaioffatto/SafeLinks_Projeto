// CAMPO DE PESQUISA: VARIÁVEIS CONSTANTES
const homePageSearchInput = document.getElementById("homePageSearchInputID");
const homePageSearchButton = document.getElementById("homePageSearchButtonID");

const homePageSearchIcon = document.getElementById("homePageSearchIconID");





// LIMPAR TEXTO INSERIDO: VARIÁVEL CONSTANTE, BUTTON
const barraDePesquisaLimparTexto = document.getElementById("barraDePesquisaLimparTexto");
// HISTÓRICO DE PESQUISA: VARIÁVEL CONSTANTE: BUTTON
const barraDePesquisaHistorico = document.getElementById("barraDePesquisaHistorico");

// CAMPO DE PESQUISAS RECENTES: VARIÁVEL CONSTANTE, DIV
const pesquisasRecentes = document.getElementById("homePagePesquisasRecentesID");
// CAMPO DE PESQUISAS RECENTES, ITEMS PESQUISADOS: VARIÁVEL CONSTANTE, DIV
const listaPesquisasRecentes = document.getElementById("pesquisasRecentesItemsID");

// TEXTO INSERIDO PELO USUÁRIO: VARIÁVEL
let searchInputText = '';

// LOJAS FAVORITADAS PELO USUÁRIO: VARIÁVEL
let favoriteStores = JSON.parse(localStorage.getItem('favoriteStores')) || {}; // <= RESOLVER ISSO NO BACKEND
// HISTÓRICO DE PESQUISA DO USUÁRIO: VARIÁVEL
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // <= RESOLVER ISSO NO BACKEND










// MENU HAMBURGUER: VARIÁVEIS
const hamburguerMenu = document.getElementById("hamburguerMenuID");
const navBarLinks = document.getElementById("homePageNavBarLinksID");
const homePageWindowLargura = window.matchMedia("(max-width: 768px)");
let navBarClickContagem = 0;

// MENU HAMBURGUER: FUNÇÕES
hamburguerMenu.addEventListener("click", () => { 
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