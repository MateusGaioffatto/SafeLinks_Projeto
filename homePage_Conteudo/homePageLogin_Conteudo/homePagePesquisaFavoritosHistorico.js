// CONSTANTES
const searchInput = document.getElementById("searchInputId");
const searchButton = document.getElementById("searchButtonId");
const limparTexto = document.getElementById("limparTexto");
const acessarHistorico = document.getElementById("acessarHistorico");
const pesquisasRecentes = document.getElementById("pesquisasRecentesId");
const listaPesquisasRecentes = document.getElementById("pesquisasRecentesItemsId");

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
                    searchInput.value = item.termo_pesquisa;
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
            searchInput.value = item;
            redirectToResults(item);
        });
        listaPesquisasRecentes.appendChild(recentItem);
    });
}

// EVENT LISTENERS
searchInput.addEventListener("keydown", function(event) {
    searchInputText = searchInput.value;
    if (event.key === 'Enter') {
        if (searchInputText.trim() !== "") { 
            redirectToResults(searchInputText);
        }
    }  
});

searchButton.addEventListener('click', function() {
    searchInputText = searchInput.value.trim();
    if (searchInputText !== "") {
        redirectToResults(searchInputText);
    }
});

// BOTÃO LIMPAR TEXTO
limparTexto.addEventListener('click', function() {
    searchInput.value = '';
    searchInput.focus();
    pesquisasRecentes.style.display = 'none';
});

// BOTÃO HISTÓRICO
acessarHistorico.addEventListener('click', function() {
    pesquisasRecentes.style.display = pesquisasRecentes.style.display === 'block' ? 'none' : 'block';
    loadSearchHistory();
});

// CARREGAR HISTÓRICO AO INICIAR
document.addEventListener('DOMContentLoaded', function() {
    loadSearchHistory();
});