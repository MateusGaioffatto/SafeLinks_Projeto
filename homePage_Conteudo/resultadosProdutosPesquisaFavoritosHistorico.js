const resultadosProdutosSearchInput = document.getElementById('resultadosProdutosSearchInputID');
const resultadosProdutosSearchButton = document.getElementById('resultadosProdutosSearchButtonID');

resultadosProdutosSearchInput.addEventListener("keydown", function() {
  searchInputText = resultadosProdutosSearchInput.value;
    if (event.key === 'Enter') {
      if (searchInputText.trim() !== "") {
        window.location.href = `resultadosProdutos.html?query=${encodeURIComponent(searchInputText)}`;
      }
    }
  });
resultadosProdutosSearchButton.addEventListener('click', function() {
  searchInputText = resultadosProdutosSearchInput.value || searchInput.value;
  if (searchInputText.trim() !== "") {
    // COMERTAR =>
    window.location.href = `resultadosProdutos.html?query=${encodeURIComponent(searchInputText)}`;
  }
})


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