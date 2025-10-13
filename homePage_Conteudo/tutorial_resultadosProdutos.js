let tutorialGifCount = 1;
if (tutorialGifCount === 1) {tutorial_resultadosProdutosBoxesPosicionamento(tutorialGifCount);}

tutorialBoxesButtonDiv[0].addEventListener('click', function() {
  if (tutorialGifCount === 1) {
    tutorialBoxes.style.display = 'none';
  }
})
tutorialBoxesButtonDiv[0].addEventListener('click', function() {
  tutorialGifCount--;
  if (tutorialGifCount === 0) {document.body.removeChild(homePageBlurEffect);}

  tutorialBoxesGifs.src = `homePageTutoriais_GIFs/Tutorial0${tutorialGifCount}.gif`
  tutorialBoxesH5.textContent = `${tutorialGifCount}/4`

  tutorial_resultadosProdutosBoxesPosicionamento(tutorialGifCount);
})

tutorialBoxesButtonDiv[1].addEventListener('click', function() {
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
        tutorialBoxesButtonDiv[0].textContent = "Mais Tarde";
        tutorialBoxesButtonDiv[1].textContent = "Próximo";

        tutorialBoxesTexto.textContent = "BARRA DE PESQUISA - TEXTO / EXPLICAR COMO FUNCIONA E O QUE É";

        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `870px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      case 2:
        tutorialBoxesButtonDiv[0].textContent = "Anterior"; 
        limparInputValue_ResultadoVerificacaoURLDiv();

        tutorialBoxesTexto.textContent = "CADASTRO DO USUARIO / ARGUMENTOS PARA EFETUAR CADASTRO - TEXTO";
        
        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = '635px';
        tutorialBoxes.style.top = '471.667px';
      break;
      case 3:
        tutorialBoxesButtonDiv[1].textContent = "Próximo";

        tutorialBoxesTexto.textContent = "VERIFICAÇÃO DE LINKS / EXPLICAÇÃO DO PORQUÊ FAZER ISSO - TEXTO";
        tutorialBoxes.style.animation = 'tutorialBoxesOpacity 1s ease forwards';
        
        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `870px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      case 4:
        limparInputValue_ResultadoVerificacaoURLDiv();

        tutorialBoxesButtonDiv[1].textContent = "Repetir";

        tutorialBoxesTexto.textContent = "EFETUAR UM PESQUISA / TUTORIAL CONTINUARÁ LOGO APÓS";

        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `25px`;
        tutorialBoxes.style.top = `167.667px`;
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
        resultadosProdutosDiv.style.zIndex = 0;
        searchInput_searchButtonsDiv.style.zIndex = 2;
        filtrosContainer.style.zIndex = 0;
      break;
      case 2:
        resultadosProdutosDiv.style.zIndex = 2;
        searchInput_searchButtonsDiv.style.zIndex = 0;
      break;
      case 3:
        filtrosContainer.style.zIndex = 2;
        searchInput_searchButtonsDiv.style.zIndex = 0;
        resultadosProdutosDiv.style.zIndex = 0;
      break;
      case 4:
        searchInput_searchButtonsDiv.style.zIndex = 2;
      break;
      default:
        console.log("🤔");  
      break;
    }
  }
}