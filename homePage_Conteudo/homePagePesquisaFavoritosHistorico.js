let gerarPordutosClickCount = 0;
// Mostrar/ocultar lista de produtos ao digitar
homePageSearchInput.addEventListener("keyup", function() {
  searchInputText = homePageSearchInput.value;
    if (event.key === 'Enter') {
      homePageProdutosDiv.style.display = "flex";
      if (gerarPordutosClickCount === 0) { modificarAnunciosDeProdutos(true) /* <= COMENTAR! */ }
      mostrarImagensDosProdutos(searchInputText);
      gerarPordutosClickCount++;
    }  
    else if (searchInputText == "") {
      homePageProdutosDiv.style.display = "none";
      gerarPordutosClickCount = 0;
      modificarAnunciosDeProdutos(false);
    }
  });
homePageSearchButton.addEventListener('click', function() {
  if (searchInputText !== "") {
    homePageProdutosDiv.style.display = "flex";
    if (gerarPordutosClickCount === 0) { modificarAnunciosDeProdutos(true) /* <= COMENTAR! */ }
    mostrarImagensDosProdutos(searchInputText);
    gerarPordutosClickCount++;
  }
})
    // Limpar pesquisa
    barraDePesquisaLimparTexto.addEventListener('click', function() {
      homePageSearchInput.value = '';
      searchInputText = '';
      homePageProdutosDiv.style.display = 'none';
      pesquisasRecentes.style.display = 'none';
    });
    // Mostrar histórico de pesquisas
    barraDePesquisaHistorico.addEventListener('click', function() {
      if (searchHistory.length > 0) {
        pesquisasRecentes.style.display = pesquisasRecentes.style.display === 'block' ? 'none' : 'block';
      } else {
        alert('Nenhum histórico de pesquisa disponível!');
      }
    });


    


// Inicializar favoritos
function initializeFavorites() {
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  favoriteBtns.forEach(btn => {
    const store = btn.dataset.store;
    // Restaurar estado dos favoritos
    btn.innerHTML = favoriteStores[store] ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    btn.classList.toggle('active', favoriteStores[store]);
    
    // Remover event listeners antigos
    btn.replaceWith(btn.cloneNode(true));
  });
  
  // Adicionar novos event listeners
  const newFavoriteBtns = document.querySelectorAll('.favorite-btn');
  newFavoriteBtns.forEach(btn => {
    const store = btn.dataset.store;
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      favoriteStores[store] = !favoriteStores[store];
      btn.innerHTML = favoriteStores[store] ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
      btn.classList.toggle('active', favoriteStores[store]);
      localStorage.setItem('favoriteStores', JSON.stringify(favoriteStores));
    });
  });
}





// Adicionar ao histórico de pesquisas
function addToSearchHistory(term) {
  // Não adicionar se já existir ou estiver vazio
  if (!term.trim() || searchHistory.includes(term)) return;
  
  // Adicionar no início da lista
  searchHistory.unshift(term);
  
  // Manter apenas os 5 últimos
  if (searchHistory.length > 5) {
    searchHistory.pop();
  }
  
  // Salvar e atualizar
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  loadSearchHistory();
}
// Carregar histórico de pesquisas
function loadSearchHistory() {
  listaPesquisasRecentes.innerHTML = '';
  
  if (searchHistory.length === 0) {
    pesquisasRecentes.style.display = 'none';
    return;
  }
  
  searchHistory.forEach(term => {
    const item = document.createElement('div');
    item.classList.add('recent-item');
    item.textContent = term;
    
    item.addEventListener('click', () => {
      homePageSearchInput.value = term;
      searchInputText = term;
      homePageProdutosDiv.style.display = 'flex';
      homePageProdutosDiv.classList.add('fade-in');
      pesquisasRecentes.style.display = 'none';
    });
    
    listaPesquisasRecentes.appendChild(item);
  });
}