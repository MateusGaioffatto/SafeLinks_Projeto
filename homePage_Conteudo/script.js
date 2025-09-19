// CAMPO DE PESQUISA: VARIÁVEIS CONSTANTES
const homePageSearchInput = document.getElementById("homePageSearchInputID");
const homePageSearchButton = document.getElementById("homePageSearchButtonID");
const homePageVoiceSearchButton = document.getElementById("homePageVoiceSearchButtonID");

const homePageSearchIcon = document.getElementById("homePageSearchIconID");
const homePageVoiceIcon = document.getElementById("homePageVoiceIconID");

// MODO ESCURO E CLÁRO: VARIÁVEIS CONSTANTES
// const modoEscuroClaroLi = document.getElementById("modoEscuroClaroLi"); // VARIÁVEL CONSTANTE, LI ITEM
// const modoEscuroClaroButton = document.getElementById("homePageModoEscuroClaroID"); // VARIÁVEL CONSTANTE, BUTTON

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





// MODIFICAR TEXTO DE PLACEHOLDER: VARIÁVEIS
const searchInputPlaceholders = ["Pesquise algum produto", "Entre com a URL de um site"];
let placeholderIndex = 0;

// MODIFICAR TEXTO DE PLACEHOLDER A CADA 5 SEGUNDOS: FUNCTION
function modificarTextoPlaceholder() {
    homePageSearchInput.classList.add("fade-out");

  setTimeout(() => {
    homePageSearchInput.placeholder = searchInputPlaceholders[placeholderIndex];
    placeholderIndex = (placeholderIndex + 1) % searchInputPlaceholders.length;

    homePageSearchInput.classList.remove("fade-out");
    homePageSearchInput.classList.add("fade-in");

    setTimeout(() => {
      homePageSearchInput.classList.remove("fade-in");
    }, 500);

  }, 3000);
}

modificarTextoPlaceholder();
setInterval(modificarTextoPlaceholder, 5000);
  




let recognition;
let recognizing = false;

// Check browser support
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR'; // Brazilian Portuguese
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    recognizing = true;
    homePageVoiceSearchButton.classList.add('active');
    homePageVoiceIcon.style.color = 'red';
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    speechStatus.textContent = 'Texto reconhecido!';
  };
  recognition.onerror = () => {
    homePageVoiceSearchButton.classList.remove('active');
  };
  
  recognition.onend = () => {
    recognizing = false;
    homePageVoiceSearchButton.classList.remove('active');
  };

  homePageVoiceSearchButton.onclick = () => {
    if (recognizing) {
      recognition.stop();
      homePageVoiceIcon.style.color = '';
    } else {
      recognition.start();
    }
  };
} else {
  homePageVoiceSearchButton.disabled = true;
  homePageVoiceIcon.textContent = 'mic_off';
  homePageVoiceIcon.style.color = 'red';
  homePageVoiceIcon.title = 'Navegador não reconhece pesquisa por voz';
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