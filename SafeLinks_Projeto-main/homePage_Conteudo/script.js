// CAMPO DE PESQUISA: VARIÁVEIS CONSTANTES
const homePageSearchInput = document.getElementById("homePageSearchInputID");
const homePageSearchButton = document.getElementById("homePageSearchButtonID");

// MODO ESCURO E CLÁRO: VARIÁVEIS CONSTANTES
const modoEscuroClaroLi = document.getElementById("modoEscuroClaroLi"); // VARIÁVEL CONSTANTE, LI ITEM
const modoEscuroClaroButton = document.getElementById("homePageModoEscuroClaroID"); // VARIÁVEL CONSTANTE, BUTTON

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





// DADOS SALVOS LOCALMENTE AO CARREGAR A PÁGINA: FUNCTION
document.addEventListener('DOMContentLoaded', function() {
  // initializeFavorites();
  // loadSearchHistory();
  
  // MODO ESCURO OU CLARO SALVO LOCALMENTE: IF & ELSE -> FUNCTION
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});





// MODIFICAR MODO ESCURO OU CLÁRO: BUTTON -> FUNCTION
modoEscuroClaroButton.addEventListener('click', function() {
  if (document.body.classList.contains('dark-mode')) {
    disableDarkMode(); // SELECIONAR MODO CLÁRO: FUNCTION
  } else {
    enableDarkMode(); // SELECIONAR MODO ESCURO: FUNCTION
  }
});

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null);
  modoEscuroClaroButton.innerHTML = '<i class="fas fa-moon"></i>';
  modoEscuroClaroButton.title = "Modo escuro"
}

function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
  modoEscuroClaroButton.innerHTML = '<i class="fas fa-sun"></i>';
  modoEscuroClaroButton.title = "Modo cláro"
}





// Navbar hamburger toggle
const hamburguerMenu = document.getElementById("hamburguerMenuID");
// const navbarLinks = document.querySelectorAll(".navbar-links li");
const navBarLinks = document.getElementById("homePageNavBarLinksID");
let navBarClickContagem = 0;

hamburguerMenu.addEventListener("click", () => { 
  navBarClickContagem++;
  if (navBarClickContagem === 1) {navBarLinks.style.opacity = 1;}
  else {navBarLinks.style.opacity = 0; navBarClickContagem = 0;}
  
});

const homePageWindowLargura = window.matchMedia("(max-width: 768px)");
function verificarLarguraHomePage(mql) {
  if (!mql.matches) {
    navBarLinks.style.opacity = 1; navBarClickContagem = 0;
  }
}
  // Initial check
  verificarLarguraHomePage(homePageWindowLargura);
  // Listen for changes
  homePageWindowLargura.addEventListener("change", verificarLarguraHomePage());