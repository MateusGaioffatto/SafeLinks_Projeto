modificarTextoPlaceholder();
setInterval(modificarTextoPlaceholder, 5000);

// MODIFICAR TEXTO DE PLACEHOLDER: VARIÁVEIS
const searchInputPlaceholders = ["Pesquise algum produto", "Entre com a URL de um site"];
let placeholderIndex = 0;

// MODIFICAR TEXTO DE PLACEHOLDER A CADA 5 SEGUNDOS: FUNCTION
function modificarTextoPlaceholder() {
    searchInput.classList.add("fade-out");

  setTimeout(() => {
    searchInput.placeholder = searchInputPlaceholders[placeholderIndex];
    placeholderIndex = (placeholderIndex + 1) % searchInputPlaceholders.length;

    searchInput.classList.remove("fade-out");
    searchInput.classList.add("fade-in");

    setTimeout(() => {
      searchInput.classList.remove("fade-in");
    }, 500);

  }, 3000);
}





// PESQUISA POR VOZ: VARIÁVEIS CONSTANTES
const voiceSearch = document.getElementById("voiceSearchId");
const homePageVoiceIcon = document.getElementById("voiceSearchIcon");

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
    voiceSearch.classList.add('active');
    homePageVoiceIcon.style.color = 'red';
  };

  recognition.onresult = (event) => { // PESQUISA POR VOZ: VALOR EM TEXTO RESULTADO DO RECONHECIMENTO
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    speechStatus.textContent = 'Texto reconhecido!';
    console.log(transcript);
  };
  recognition.onerror = () => { // PESQUISA POR VOZ: ERRO NO RECONHECIMENTO
    voiceSearch.classList.remove('active');
  };
  
  recognition.onend = () => { // PESQUISA POR VOZ: FIM DO RECONHECIMENTO
    recognizing = false;
    voiceSearch.classList.remove('active');
  };

  voiceSearch.onclick = () => { // PESQUISA POR VOZ: BOTÃO DE INÍCIO/FIM DO RECONHECIMENTO
    if (recognizing) {
      recognition.stop();
      homePageVoiceIcon.style.color = '';
    } else {
      recognition.start();
    }
  };
} else {
  voiceSearch.disabled = true;
  homePageVoiceIcon.textContent = 'mic_off';
  homePageVoiceIcon.style.color = 'red';
  homePageVoiceIcon.title = 'Navegador não reconhece pesquisa por voz';
}





const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})$/i;
// COMERTAR =>
    
// Função para verificar segurança da URL
async function verificarUrlSegura(url) {
    try {
        const response = await fetch('safe_browsing_api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });
        
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error('Erro ao verificar URL:', error);
        return { segura: true, erro: 'Erro na verificação' };
    }
}

// Função para verificar se é uma URL válida
function isUrl(valor) {
    try {
        new URL(valor);
        return true;
    } catch (e) {
        return false;
    }
}

// Função para mostrar resultados da verificação de URL
function mostrarresultadoVerificacaoURLUrl(resultadoVerificacaoURL, url) {
    // Criar modal ou overlay para mostrar resultados
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    const modal = document.createElement('div');
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.maxWidth = '500px';
    modal.style.width = '90%';
    
    if (resultadoVerificacaoURL.segura) {
        modal.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-shield-check" style="font-size: 48px; color: #28a745;"></i>
                <h2 style="color: #28a745;">URL Segura</h2>
                <p>A URL <strong>${url}</strong> foi verificada e considerada segura pelo Google Safe Browsing.</p>
                <div style="margin-top: 20px;">
                    <button onclick="window.open('${url}', '_blank')" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-right: 10px; cursor: pointer;">
                        <i class="fas fa-external-link-alt"></i> Acessar URL
                        <button onclick="document.body.removeChild(this.parentElement.parentElement.parentElement)" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    </button>
                        Fechar
                    </button>
                </div>
            </div>
        `;
    } else {
        const ameacas = resultadoVerificacaoURL.ameacas ? resultadoVerificacaoURL.ameacas.map(a => 
            `<li>${a.tipo} (${a.plataforma})</li>`
        ).join('') : '<li>URL suspeita</li>';
        
        modal.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-shield-alt" style="font-size: 48px; color: #dc3545;"></i>
                <h2 style="color: #dc3545;">URL Potencialmente Perigosa</h2>
                <p>A URL <strong>${url}</strong> foi identificada como potencialmente perigosa!</p>
                <h3>Ameaças detectadas:</h3>
                <ul style="text-align: left; margin-left: 20px;">${ameacas}</ul>
                <p style="color: #dc3545; font-weight: bold;">Recomendamos não acessar este link.</p>
                <div style="margin-top: 20px;">
                    <button onclick="document.body.removeChild(this.parentElement.parentElement.parentElement)" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
        `;
    }
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Fechar modal clicando fora
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

// Função principal para processar a entrada do usuário
async function processarEntradaUsuario(entrada) {
    const texto = entrada.trim();
    
    if (!texto) return;
    
    // Verificar se é uma URL
    if (isUrl(texto)) {
        // É uma URL - verificar segurança
        const resultado = await verificarUrlSegura(texto);
        mostrarresultadoVerificacaoURLUrl(resultado, texto);
    } else {
        // É um termo de pesquisa - redirecionar para resultados
        window.location.href = `resultadosProdutos.html?query=${encodeURIComponent(texto)}`;
    }
}

// Modificar os event listeners
searchInput.addEventListener("keydown", async function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        await processarEntradaUsuario(searchInput.value);
    }
});

searchButton.addEventListener('click', async function() {
    await processarEntradaUsuario(searchInput.value);
});

// Limpar pesquisa
limparTexto.addEventListener('click', function() {
  searchInput.value = '';
    resultadosProdutosSearchInput.value = '';
  searchInputText = '';
    homePageProdutosDiv.style.display = 'none';
  pesquisasRecentes.style.display = 'none';
});

// Mostrar histórico de pesquisas
acessarHistorico.addEventListener('click', function() {
  if (searchHistory.length > 0) {
    pesquisasRecentes.style.display = pesquisasRecentes.style.display === 'block' ? 'none' : 'block';
  } else {
    alert('Nenhum histórico de pesquisa disponível!');
  }
});




// Inicializar favoritos
// function initializeFavorites() {
//   const favoriteBtns = document.querySelectorAll('.favorite-btn');
//   favoriteBtns.forEach(btn => {
//     const store = btn.dataset.store;
//     // Restaurar estado dos favoritos
//     btn.innerHTML = favoriteStores[store] ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
//     btn.classList.toggle('active', favoriteStores[store]);
    
//     // Remover event listeners antigos
//     btn.replaceWith(btn.cloneNode(true));
//   });
  
  // Adicionar novos event listeners
//   const newFavoriteBtns = document.querySelectorAll('.favorite-btn');
//   newFavoriteBtns.forEach(btn => {
//     const store = btn.dataset.store;
//     btn.addEventListener('click', function(e) {
//       e.stopPropagation();
//       favoriteStores[store] = !favoriteStores[store];
//       btn.innerHTML = favoriteStores[store] ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
//       btn.classList.toggle('active', favoriteStores[store]);
//       localStorage.setItem('favoriteStores', JSON.stringify(favoriteStores));
//     });
//   });
// }





// Adicionar ao histórico de pesquisas
// function addToSearchHistory(term) {
//   // Não adicionar se já existir ou estiver vazio
//   if (!term.trim() || searchHistory.includes(term)) return;
  
//   // Adicionar no início da lista
//   searchHistory.unshift(term);
  
//   // Manter apenas os 5 últimos
//   if (searchHistory.length > 5) {
//     searchHistory.pop();
//   }
  
//   // Salvar e atualizar
//   localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
//   loadSearchHistory();
// }
// // Carregar histórico de pesquisas
// function loadSearchHistory() {
//   listaPesquisasRecentes.innerHTML = '';
  
//   if (searchHistory.length === 0) {
//     pesquisasRecentes.style.display = 'none';
//     return;
//   }
  
//   searchHistory.forEach(term => {
//     const item = document.createElement('div');
//     item.classList.add('recent-item');
//     item.textContent = term;
    
//     item.addEventListener('click', () => {
//       searchInput.value = term;
//       searchInputText = term;
//       homePageProdutosDiv.style.display = 'flex';
//       homePageProdutosDiv.classList.add('fade-in');
//       pesquisasRecentes.style.display = 'none';
//     });
    
//     listaPesquisasRecentes.appendChild(item);
//   });
// }