// CONSTANTES
const homePageSearchInput = document.getElementById("homePageSearchInputID");
const homePageSearchButton = document.getElementById("homePageSearchButtonID");
const barraDePesquisaLimparTexto = document.getElementById("barraDePesquisaLimparTexto");
const barraDePesquisaHistorico = document.getElementById("barraDePesquisaHistorico");
const pesquisasRecentes = document.getElementById("homePagePesquisasRecentesID");
const listaPesquisasRecentes = document.getElementById("pesquisasRecentesItemsID");

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// FUNÇÃO PARA REDIRECIONAR E SALVAR NO BANCO
async function redirectToResults(searchQuery) {
    // Salvar no banco de dados
    try {
        const response = await fetch('historico.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ termo: searchQuery })
        });
        
        if (!response.ok) throw new Error('Erro ao salvar histórico');
        
    } catch (error) {
        console.error('Erro:', error);
        // Fallback para localStorage se o banco falhar
        if (!searchHistory.includes(searchQuery)) {
            searchHistory.unshift(searchQuery);
            searchHistory = searchHistory.slice(0, 10);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    }
    
    window.location.href = `resultadosProdutos.html?query=${encodeURIComponent(searchQuery)}`;
}

// CARREGAR HISTÓRICO DO BANCO
async function loadSearchHistory() {
    try {
        const response = await fetch('historico.php');
        if (response.ok) {
            const historico = await response.json();
            listaPesquisasRecentes.innerHTML = '';
            
            historico.forEach(item => {
                const recentItem = document.createElement('div');
                recentItem.className = 'recent-item';
                recentItem.textContent = item.termo_pesquisa;
                recentItem.addEventListener('click', function() {
                    homePageSearchInput.value = item.termo_pesquisa;
                    redirectToResults(item.termo_pesquisa);
                });
                listaPesquisasRecentes.appendChild(recentItem);
            });
            return;
        }
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
    }
    
    // Fallback para localStorage
    listaPesquisasRecentes.innerHTML = '';
    searchHistory.forEach(item => {
        const recentItem = document.createElement('div');
        recentItem.className = 'recent-item';
        recentItem.textContent = item;
        recentItem.addEventListener('click', function() {
            homePageSearchInput.value = item;
            redirectToResults(item);
        });
        listaPesquisasRecentes.appendChild(recentItem);
    });
}

// EVENT LISTENERS
homePageSearchInput.addEventListener("keydown", function(event) {
    searchInputText = homePageSearchInput.value;
    if (event.key === 'Enter') {
        if (searchInputText.trim() !== "") { 
            redirectToResults(searchInputText);
        }
    }  
});

homePageSearchButton.addEventListener('click', function() {
    searchInputText = homePageSearchInput.value.trim();
    if (searchInputText !== "") {
        redirectToResults(searchInputText);
    }
});

// BOTÃO LIMPAR TEXTO
barraDePesquisaLimparTexto.addEventListener('click', function() {
    homePageSearchInput.value = '';
    homePageSearchInput.focus();
    pesquisasRecentes.style.display = 'none';
});

// BOTÃO HISTÓRICO
barraDePesquisaHistorico.addEventListener('click', function() {
    pesquisasRecentes.style.display = pesquisasRecentes.style.display === 'block' ? 'none' : 'block';
    loadSearchHistory();
});

// CARREGAR HISTÓRICO AO INICIAR
document.addEventListener('DOMContentLoaded', function() {
    loadSearchHistory();
});