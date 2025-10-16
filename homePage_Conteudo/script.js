const navBarElemento = document.getElementById("navBarElementoId");



const tutorialBoxes = document.getElementById("tutorialBoxesID");
const homePageBlurEffect = document.getElementById("homePageBlurEffectID");

const tutorialBoxesH5 = document.querySelector(".tutorialBoxesCloseIcone h5");
const tutorialBoxesCloseIcone = document.querySelector(".tutorialBoxesCloseIcone i");

const tutorialBoxesGifs = document.querySelector(".tutorialBoxesImagensStyles img")

let tutorialBoxesTexto = document.querySelector(".tutorialBoxes p");

const tutorialBoxesButtonDiv = document.querySelectorAll(".tutorialBoxesButtonDiv button");





const homePage_Titulo_Pesquisa_Opcoes = document.getElementById("homePage_Titulo_Pesquisa_OpcoesId");
const searchInput_searchButtonsDiv = document.getElementById("searchInput_searchButtonsDivId");



const searchInputDiv = document.getElementById("searchInputDivId");
const searchInput = document.getElementById("searchInputId");
const searchButton = document.getElementById("searchButtonId");
const homePageSearchIcon = document.getElementById("searchButtonIcon");
  const searchInput_posicionamento = searchInput.getBoundingClientRect();



const limparTexto = document.getElementById("limparTexto");
const acessarHistorico = document.getElementById("acessarHistorico");



const pesquisasRecentes = document.getElementById("pesquisasRecentesId");
const listaPesquisasRecentes = document.getElementById("pesquisasRecentesItemsId");



let searchInputText = '';



const resultadoVerificacaoURL = document.getElementById('resultadoVerificacaoURL');
const resultadoVerificacaoURLDiv = document.querySelector('.resultadoVerificacaoURL div');



let favoriteStores = JSON.parse(localStorage.getItem('favoriteStores')) || {}; 
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; 



const menuHamburguerElemento = document.getElementById("menuHamburguerElementoId");



const navBarLinks = document.getElementById("navBarLinksId");
let navBarClickContagem = 0;



const filtrosContainer = document.getElementById("filtrosContainerID");

const resultadosProdutosDiv = document.getElementById("resultadosProdutosDivID"); 
const resultadosProdutosUl = document.getElementById("resultadosProdutosUlID"); 



const homePageWindowLargura = window.matchMedia("(max-width: 768px)");





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
})