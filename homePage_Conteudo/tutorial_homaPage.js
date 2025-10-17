let tutorialGifCount = 1;
// const tutorialBoxes_HomePagePosicionamentos = [
//   tutorialBox01_Posicionamento,
//   tutorialBox02_Posicionamento,
//   tutorialBox03_Posicionamento
// ];

tutorialBoxesButtonsDiv[0].addEventListener('click', function() {
  tutorialGifCount--;
  if (tutorialGifCount === 0) {
    tutorialBoxes.style.display = 'none';
    document.body.removeChild(homePageBlurEffect);
    tutorialGifCount = 1;
  }
})

// let desktopView = menuHamburguerElemento && getComputedStyle(menuHamburguerElemento).display === "block" ? false : true

if (tutorialGifCount === 1) {tutorial_homePageBoxesPosicionamento(tutorialGifCount);}

// tutorialBoxesButtonsDiv[1].addEventListener('click', function() {
//   tutorialGifCount++;
//   console.log(tutorialGifCount);
//   tutorialBoxes_HomePagePosicionamentos[tutorialGifCount](tutorialGifCount, desktopView);
// })

// function tutorialBox01_Posicionamento(tutorialGifCount, desktopView) {  
//   if (desktopView) {
//     tutorialBoxesButtonsDiv[0].textContent = "Mais Tarde";
//     tutorialBoxesButtonsDiv[1].textContent = "Próximo";

//     searchInputDiv.style.pointerEvents = 'none';
//     searchInput.value = '';

//     tutorialBoxesAnimationOpacityStyle();
//     tutorialBoxesTexto.textContent = tutorialBoxes_HomePageTextos(tutorialGifCount);
//     homePageElementos_zIndexStyle(tutorialGifCount);

//     tutorialBoxes.style.left = `870px`;
//     tutorialBoxes.style.top = `167.667px`;
//   }
//   else {

//   }
// }
// function tutorialBox02_Posicionamento(tutorialGifCount, desktopView) {
//   if (desktopView) {
//     const enter = new KeyboardEvent('keydown',{key: 'Enter'});
//     searchInput.value = "http://127.0.0.1:5502/homePage_Conteudo/index.html";
//     searchInput.dispatchEvent(enter);

//     tutorialBoxesButtonsDiv[1].textContent = "Próximo";

//     tutorialBoxesAnimationOpacityStyle();
//     tutorialBoxesTexto.textContent = tutorialBoxes_HomePageTextos(tutorialGifCount);
//     homePageElementos_zIndexStyle(tutorialGifCount);

//     tutorialBoxes.style.left = `25px`;
//     tutorialBoxes.style.top = `167.667px`;
//   }
//   else {
    
//   }
// }
// function tutorialBox03_Posicionamento(tutorialGifCount, desktopView) {
//   if (desktopView) {

//   }
//   else {
    
//   }
// }
tutorialBoxesButtonsDiv[0].addEventListener('click', function() {
  if (tutorialGifCount === 0) {document.body.removeChild(homePageBlurEffect);}

  tutorialBoxesGifs.src = `homePageTutoriais_GIFs/homePage_GIFs/Tutorial0${tutorialGifCount}.gif`
  tutorialBoxesH5.textContent = `${tutorialGifCount}/3`

  tutorial_homePageBoxesPosicionamento(tutorialGifCount);
})

tutorialBoxesButtonsDiv[1].addEventListener('click', function() {
    tutorialGifCount++;
    if (tutorialGifCount > 3) {tutorialGifCount = 1;}

    tutorialBoxesGifs.src = `homePageTutoriais_GIFs/homePage_GIFs/Tutorial0${tutorialGifCount}.gif`
    tutorialBoxesH5.textContent = `${tutorialGifCount}/3`

    tutorial_homePageBoxesPosicionamento(tutorialGifCount);
})





function tutorial_homePageBoxesPosicionamento(tutorialGifCount) {
  if (menuHamburguerElemento && getComputedStyle(menuHamburguerElemento).display === "block") {
    tutorialBoxes.style.left = `55px`;
    switch (tutorialGifCount) {
      case 1:
                limparInputValue_ResultadoVerificacaoURLDiv();
        tutorialBoxes.style.top = 'initial';
        homePageElementos_zIndexStyle(tutorialGifCount); 
                        tutorialBoxesButtonsDiv[0].textContent = "Mais tarde";
        tutorialBoxesButtonsDiv[1].textContent = "Próximo";
      break;
      case 2:
                tutorialBoxesButtonsDiv[0].textContent = "Anterior";
        tutorialBoxes.style.top = '15px';
        const enter = new KeyboardEvent('keydown',{key: 'Enter'});
        searchInput.value = "http://127.0.0.1:5502/homePage_Conteudo/index.html";
        searchInput.dispatchEvent(enter);

        homePageElementos_zIndexStyle(tutorialGifCount);
      break;
      case 3:
        limparInputValue_ResultadoVerificacaoURLDiv();
        tutorialBoxes.style.top = '70.667px';
        homePageElementos_zIndexStyle(tutorialGifCount); 
                tutorialBoxesButtonsDiv[1].textContent = "Repetir";
      break;
    }
  }
  else {
      switch (tutorialGifCount) {
      case 1:
        limparInputValue_ResultadoVerificacaoURLDiv();
        
        tutorialBoxesButtonsDiv[0].textContent = "Mais Tarde";
        tutorialBoxesButtonsDiv[1].textContent = "Próximo";

        tutorialBoxesTexto.textContent = "Este é o campo de pesquisa. Aqui você pode digitar o endereço (URL) de um site ou o nome de um produto que deseja pesquisar. Basta clicar e começar a digitar. É simples e seguro!";

        searchInputDiv.style.pointerEvents = 'none';
        searchInput.value = '';

        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `870px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      case 2:
        const enter = new KeyboardEvent('keydown',{key: 'Enter'});
        searchInput.value = "http://127.0.0.1:5502/homePage_Conteudo/index.html";
        searchInput.dispatchEvent(enter);

        tutorialBoxesButtonsDiv[0].textContent = "Anterior";
        tutorialBoxesButtonsDiv[1].textContent = "Próximo";

        tutorialBoxesTexto.textContent = "URL é o endereço de um site, como www.exemplo.com.br. Verificar links é importante para garantir que você está acessando sites confiáveis e evitar golpes. Entre ou cole a URL e clique na '🔍︎' para verificar se o site é seguro.";
        tutorialBoxes.style.animation = 'tutorialBoxesOpacity 1s ease forwards';
        
        tutorialBoxesAnimationOpacityStyle();
        homePageElementos_zIndexStyle(tutorialGifCount);

        tutorialBoxes.style.left = `25px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      case 3:
        limparInputValue_ResultadoVerificacaoURLDiv();
        searchInputDiv.style.pointerEvents = 'initial';

        tutorialBoxesButtonsDiv[1].textContent = "Repetir";

        tutorialBoxesTexto.textContent = "Agora, experimente pesquisar um produto ou site! Digite o nome do produto ou a URL desejada e clique na '🔍︎'. Você será redirecionado para os resultados. Assim, você navega com mais segurança e simplicidade!";

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

// function tutorialBoxes_HomePageTextos(tutorialGifCount) {
//   switch (tutorialGifCount) {
//     case 1:
//       return "1";
//     break;
//     case 2:
//       return "2";
//     break;
//     case 3:
//       return "3";
//     break;
//     default:
//       return "🤔";
//     break;
//   }
// }

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
        resultadoVerificacaoURL.style.zIndex = 2;
        searchInput_searchButtonsDiv.style.zIndex = 2;
        navBarElemento.style.zIndex = 0;
      break;
      case 3:
        searchInput_searchButtonsDiv.style.zIndex = 2;
        resultadoVerificacaoURL.style.zIndex = 0;
      break;
      default:
        console.log("🤔");  
      break;
    }
  }
}