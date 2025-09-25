// CAMPO DE PESQUISA: VARIÁVEIS CONSTANTES
const homePageSearchInput = document.getElementById("homePageSearchInputID");
const homePageSearchButton = document.getElementById("homePageSearchButtonID");
const homePageVoiceSearchButton = document.getElementById("homePageVoiceSearchButtonID");

const homePageSearchIcon = document.getElementById("homePageSearchIconID");
const homePageVoiceIcon = document.getElementById("homePageVoiceIconID");





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
 




// PESQUISA POR VOZ: VARIÁVEIS
let recognition;
let recognizing = false;

// PESQUISA POR VOZ: FUNÇÕES
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) { // VERIFICAR SE O NAVEGADOR É COMPATÍVEL
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => { // PESQUISA POR VOZ: INÍCIO DO RECONHECIMENTO
    recognizing = true;
    homePageVoiceSearchButton.classList.add('active');
    homePageVoiceIcon.style.color = 'red';
  };

  recognition.onresult = (event) => { // PESQUISA POR VOZ: VALOR EM TEXTO RESULTADO DO RECONHECIMENTO
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    speechStatus.textContent = 'Texto reconhecido!';
    console.log(transcript);
  };
  recognition.onerror = () => { // PESQUISA POR VOZ: ERRO NO RECONHECIMENTO
    homePageVoiceSearchButton.classList.remove('active');
  };
  
  recognition.onend = () => { // PESQUISA POR VOZ: FIM DO RECONHECIMENTO
    recognizing = false;
    homePageVoiceSearchButton.classList.remove('active');
  };

  homePageVoiceSearchButton.onclick = () => { // PESQUISA POR VOZ: BOTÃO DE INÍCIO/FIM DO RECONHECIMENTO
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