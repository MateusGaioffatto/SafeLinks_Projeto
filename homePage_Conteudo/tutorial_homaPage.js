let tutorialGifCount = 1;
if (tutorialGifCount === 1) {tutorial_homePageBoxesPosicionamento(tutorialGifCount);}

tutorialBoxesButtonDiv[0].addEventListener('click', function() {
  if (tutorialGifCount === 1) {
    tutorialBoxes.style.display = 'none';
  }
})
tutorialBoxesButtonDiv[0].addEventListener('click', function() {
  tutorialGifCount--;
  if (tutorialGifCount === 0) {document.body.removeChild(homePageBlurEffect);}

  tutorialBoxesGifs.src = `homePageTutoriais_GIFs/homePage_GIFs/Tutorial0${tutorialGifCount}.gif`
  tutorialBoxesH5.textContent = `${tutorialGifCount}/4`

  tutorial_homePageBoxesPosicionamento(tutorialGifCount);
})

tutorialBoxesButtonDiv[1].addEventListener('click', function() {
    tutorialGifCount++;
    if (tutorialGifCount > 4) {tutorialGifCount = 1;}

    tutorialBoxesGifs.src = `homePageTutoriais_GIFs/homePage_GIFs/Tutorial0${tutorialGifCount}.gif`
    tutorialBoxesH5.textContent = `${tutorialGifCount}/4`

    tutorial_homePageBoxesPosicionamento(tutorialGifCount);
})





function tutorial_homePageBoxesPosicionamento(tutorialGifCount) {
  if (menuHamburguerElemento && getComputedStyle(menuHamburguerElemento).display === "block") {
    tutorialBoxes.style.left = `85px`;
    switch (tutorialGifCount) {
      case 1:
        tutorialBoxes.style.top = '555.667px';
        homePageElementos_zIndexStyle(tutorialGifCount); 
        tutorialBoxesButtonDiv[1].textContent = "Próximo";
      break;
      case 2:
        limparInputValue_ResultadoVerificacaoURLDiv();
        tutorialBoxes.style.top = '70.667px';
        homePageElementos_zIndexStyle(tutorialGifCount); 
      break;
      case 3:
        tutorialBoxes.style.top = '15px';
        const enter = new KeyboardEvent('keydown',{key: 'Enter'});
        searchInput.value = "http://127.0.0.1:5502/homePage_Conteudo/index.html";
        searchInput.dispatchEvent(enter);

        homePageElementos_zIndexStyle(tutorialGifCount);
      break;
      case 4:
        limparInputValue_ResultadoVerificacaoURLDiv();
        tutorialBoxes.style.top = '80px';
        homePageElementos_zIndexStyle(tutorialGifCount);
        tutorialBoxesButtonDiv[1].textContent = "Repetir";
      break;
    }
  }
  else {
      switch (tutorialGifCount) {
      case 1:
        tutorialBoxesButtonDiv[0].textContent = "Mais Tarde";
        tutorialBoxesButtonDiv[1].textContent = "Próximo";

        tutorialBoxesTexto.textContent = "CAMPO DE PESQUISA: EXPLICAR COMO FUNCIONA E O QUE É";

        searchInputDiv.style.pointerEvents = 'none';
        searchInput.value = '';

        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `870px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      case 2:
        tutorialBoxesButtonDiv[0].textContent = "Anterior"; 
        limparInputValue_ResultadoVerificacaoURLDiv();

        tutorialBoxesTexto.textContent = "CADASTRO DO USUARIO: ARGUMENTOS PARA EFETUAR CADASTRO - TEXTO";
        
        searchInputDiv.style.pointerEvents = 'initial';

        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `443px`;
        tutorialBoxes.style.top = `70px`;
      break;
      case 3:
        const enter = new KeyboardEvent('keydown',{key: 'Enter'});
        searchInput.value = "http://127.0.0.1:5502/homePage_Conteudo/index.html";
        searchInput.dispatchEvent(enter);

        tutorialBoxesButtonDiv[1].textContent = "Próximo";

        tutorialBoxesTexto.textContent = "VERIFICAÇÃO DE LINKS: EXPLICAÇÃO DO PORQUÊ FAZER ISSO";
        tutorialBoxes.style.animation = 'tutorialBoxesOpacity 1s ease forwards';
        
        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `25px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      case 4:
        limparInputValue_ResultadoVerificacaoURLDiv();

        tutorialBoxesButtonDiv[1].textContent = "Repetir";

        tutorialBoxesTexto.textContent = "EFETUAR UM PESQUISA: TUTORIAL CONTINUARÁ LOGO APÓS";

        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `870px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      default:
        console.log("ué"); 
      break;       
    }
  }
  function limparInputValue_ResultadoVerificacaoURLDiv() {
    searchInput.value = "";
    resultadoVerificacaoURL.style.display = 'none';
  }

  function tutorialBoxesAnimationOpacityStyle() {
    tutorialBoxes.style.animation = "none";
    void tutorialBoxes.offsetWidth;
    tutorialBoxes.style.animation = "tutorialBoxesOpacity 0.5s ease forwards";
  }

  function homePageElementos_zIndexStyle(tutorialGifCount) {

    switch (tutorialGifCount) {
      case 1:
        searchInput_searchButtonsDiv.style.zIndex = 2;
        navBarElemento.style.zIndex = 0;
      break;
      case 2:
        searchInput_searchButtonsDiv.style.zIndex = 0;
        navBarElemento.style.zIndex = 2;
      break;
      case 3:
        resultadoVerificacaoURL.style.zIndex = 2;
        searchInput_searchButtonsDiv.style.zIndex = 2;
        navBarElemento.style.zIndex = 0;
      break;
      case 4:
        searchInput_searchButtonsDiv.style.zIndex = 2;
        resultadoVerificacaoURL.style.zIndex = 0;
      break;
      default:
        console.log("🤔");  
      break;
    }
  }
}