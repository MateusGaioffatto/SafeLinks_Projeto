let tutorialGifCount = 1;
if (tutorialGifCount === 1) {tutorial_resultadosProdutosBoxesPosicionamento(tutorialGifCount);}

tutorialBoxesButtonsDiv[0].addEventListener('click', function() {
  if (tutorialGifCount === 1) {
    tutorialBoxes.style.display = 'none';
  }
})
tutorialBoxesButtonsDiv[0].addEventListener('click', function() {
  tutorialGifCount--;
  if (tutorialGifCount === 0) {document.body.removeChild(homePageBlurEffect);}

  tutorialBoxesGifs.src = `homePageTutoriais_GIFs/Tutorial0${tutorialGifCount}.gif`
  tutorialBoxesH5.textContent = `${tutorialGifCount}/5`

  tutorial_resultadosProdutosBoxesPosicionamento(tutorialGifCount);
})

tutorialBoxesButtonsDiv[1].addEventListener('click', function() {
    tutorialGifCount++;
    if (tutorialGifCount > 4) {tutorialGifCount = 1;}

    tutorialBoxesGifs.src = `homePageTutoriais_GIFs/Tutorial0${tutorialGifCount}.gif`
    tutorialBoxesH5.textContent = `${tutorialGifCount}/4`

    tutorial_resultadosProdutosBoxesPosicionamento(tutorialGifCount);
})





function tutorial_resultadosProdutosBoxesPosicionamento(tutorialGifCount) {
  if (menuHamburguerElemento && getComputedStyle(menuHamburguerElemento).display === "block") {
    tutorialBoxes.style.left = `85px`;
    tutorialBoxes.style.top = `307.667px`;
  }
  else {
      switch (tutorialGifCount) {
      case 1:
        tutorialBoxesButtonsDiv[0].textContent = "Mais Tarde";
        tutorialBoxesButtonsDiv[1].textContent = "Próximo";

        tutorialBoxesTexto.textContent = "RESULTADOS PRODUTOS: CAMPO DE PESQUISA";

        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `872px`;
        tutorialBoxes.style.top = `42.667px`;
      break;
      case 2:
        tutorialBoxesButtonsDiv[0].textContent = "Anterior"; 
        limparInputValue_ResultadoVerificacaoURLDiv();

        tutorialBoxesTexto.textContent = "VITRINE DE PRODUTOS: EXPLICAR TODOS OS DADOS PRESENTE";
        
        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `339px`;
        tutorialBoxes.style.top = '471.667px';
      break;
      case 3:
        tutorialBoxesButtonsDiv[1].textContent = "Próximo";

        tutorialBoxesTexto.textContent = "FAVORITOS: EXPLICAÇÃO COMO FUNCIONA E COMO FICAM SALVOS NO PERFIL";
        tutorialBoxes.style.animation = 'tutorialBoxesOpacity 1s ease forwards';
        
        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = '635px';
        tutorialBoxes.style.top = '471.667px';
      break;
      case 4:
        limparInputValue_ResultadoVerificacaoURLDiv();

        tutorialBoxesButtonsDiv[1].textContent = "Repetir";

        tutorialBoxesTexto.textContent = "HISTÓRICO: EXPLICAÇÃO COMO FUNCIONA E COMO FICA SALVO NO PERFIL";

        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `935px`;
        tutorialBoxes.style.top = '471.667px';
      break;
      default:
        console.log("ué"); 
      break;       
    }
  }
  function limparInputValue_ResultadoVerificacaoURLDiv() {
    searchInput.value = "";
  }

  function tutorialBoxesAnimationOpacityStyle() {
    tutorialBoxes.style.animation = "none";
    void tutorialBoxes.offsetWidth;
    tutorialBoxes.style.animation = "tutorialBoxesOpacity 0.5s ease forwards";
  }

  function homePageElementos_zIndexStyle(tutorialGifCount) {

    switch (tutorialGifCount) {
      case 1:
        // resultadosProdutosDiv.style.zIndex = 0;
        searchInput_searchButtonsDiv.style.zIndex = 2;
      break;
      case 2:
        filtrosContainer.style.zIndex = 0;
        // resultadosProdutosDiv.style.zIndex = 2;
        searchInput_searchButtonsDiv.style.zIndex = 0;
      break;
      case 3:
        console.log(3);
      break;
      case 4:
        console.log(4);
      break;
      case 5:
        filtrosContainer.style.zIndex = 2;
        // resultadosProdutosDiv.style.zIndex = 0;
        searchInput_searchButtonsDiv.style.zIndex = 0;
      break;
      default:
        console.log("🤔");  
      break;
    }
  }
}