function tutorial_homePageBoxesPosicionamento(tutorialGifCount) {
  if (menuHamburguerElemento && getComputedStyle(menuHamburguerElemento).display === "block") {
    tutorialBoxes.style.left = `85px`;
    tutorialBoxes.style.top = `307.667px`;

    if (tutorialGifCount === 3) {
      const enter = new KeyboardEvent('keydown',{key: 'Enter'});
      searchInput.value = "http://127.0.0.1:5502/homePage_Conteudo/index.html";
      searchInput.dispatchEvent(enter);

      tutorialBoxes.style.top = '170px';
    }
    else {
      limparInputValue_ResultadoVerificacaoURLDiv();
    }
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

        tutorialBoxes.style.left = `443px`;
        tutorialBoxes.style.top = `70px`;
      break;
      case 3:
        const enter = new KeyboardEvent('keydown',{key: 'Enter'});
        searchInput.value = "http://127.0.0.1:5502/homePage_Conteudo/index.html";
        searchInput.dispatchEvent(enter);

        tutorialBoxesButtonDiv[1].textContent = "Próximo";

        tutorialBoxesTexto.textContent = "VERIFICAÇÃO DE LINKS / EXPLICAÇÃO DO PORQUÊ FAZER ISSO - TEXTO";
        tutorialBoxes.style.animation = 'tutorialBoxesOpacity 1s ease forwards';
        
        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `25px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      case 4:
        limparInputValue_ResultadoVerificacaoURLDiv();

        tutorialBoxesButtonDiv[1].textContent = "Repetir";

        tutorialBoxesTexto.textContent = "EFETUAR UM PESQUISA / TUTORIAL CONTINUARÁ LOGO APÓS";

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