const tutorialBoxes = document.getElementById("tutorialBoxesID");
const homePageBlurEffect = document.getElementById("homePageBlurEffectID");

const tutorialBoxesH5 = document.querySelector(".tutorialBoxesMinusCloseStyles h5");
const tutorialBoxesMinusCloseStyles = document.querySelectorAll(".tutorialBoxesMinusCloseStyles i");

const tutorialBoxesGifs = document.querySelector(".tutorialBoxesImagensStyles img")

let tutorialBoxesTexto = document.querySelector(".tutorialBoxes p");

const tutorialBoxesButtonDiv = document.querySelectorAll(".tutorialBoxesButtonDiv button");

const tutorialBoxesMinimize = document.getElementById("tutorialBoxesMinimizeID")
const tutorialBoxesMinimizeIcons = document.querySelectorAll(".tutorialBoxesMinimize i");
const tutorialBoxes_tutorialBoxesMinimize = [tutorialBoxes, tutorialBoxesMinimize];





tutorialBoxesMinusCloseStyles[0].addEventListener('click', function() {
    tutorialBoxes.style.display = 'none'; 
    tutorialBoxesMinimize.style.display = 'inherit';
})
tutorialBoxesMinusCloseStyles[1].addEventListener('click', function() {
  tutorialBoxes.style.display = 'none'; 
  document.body.removeChild(homePageBlurEffect);
})





let tutorialGifCount = 1;
if (tutorialGifCount === 1) {tutorialBoxesPosicionamento(tutorialGifCount);}

tutorialBoxesButtonDiv[0].addEventListener('click', function() {
  if (tutorialGifCount === 1) {
    tutorialBoxes.style.display = 'none';
  }
})
tutorialBoxesButtonDiv[0].addEventListener('click', function() {
  tutorialGifCount--;
  if (tutorialGifCount === 0) {document.body.removeChild(homePageBlurEffect);}

  tutorialBoxesGifs.src = `homePageTutoriais_GIFs/Tutorial0${tutorialGifCount}.gif`
  tutorialBoxesH5.textContent = `${tutorialGifCount}/5`

  tutorialBoxesPosicionamento(tutorialGifCount);
})

tutorialBoxesButtonDiv[1].addEventListener('click', function() {
    tutorialGifCount++;
    if (tutorialGifCount > 5) {tutorialGifCount = 1;}

    tutorialBoxesGifs.src = `homePageTutoriais_GIFs/Tutorial0${tutorialGifCount}.gif`
    tutorialBoxesH5.textContent = `${tutorialGifCount}/5`

    tutorialBoxesPosicionamento(tutorialGifCount);
})



function tutorialBoxesPosicionamento(tutorialGifCount) {
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

        tutorialBoxesTexto.textContent = "BARRA DE PESQUISA - TEXTO";

        tutorialBoxes.style.animation = "none";
        void tutorialBoxes.offsetWidth;
        tutorialBoxes.style.animation = "tutorialBoxesOpacity 0.5s ease forwards";

        tutorialBoxes.style.left = `870px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      case 2:
        tutorialBoxesButtonDiv[0].textContent = "Anterior"; 
        limparInputValue_ResultadoVerificacaoURLDiv();

        tutorialBoxesTexto.textContent = "CADASTRO DO USUARIO / ARGUMENTOS PARA EFETUAR CADASTRO - TEXTO";
        
        tutorialBoxes.style.animation = "none";
        void tutorialBoxes.offsetWidth;
        tutorialBoxes.style.animation = "tutorialBoxesOpacity 0.5s ease forwards";

        tutorialBoxes.style.left = `443px`;
        tutorialBoxes.style.top = `70px`;
      break;
      case 3:
        const enter = new KeyboardEvent('keydown',{key: 'Enter'});
        searchInput.value = "http://127.0.0.1:5502/homePage_Conteudo/index.html";
        searchInput.dispatchEvent(enter);

        tutorialBoxesTexto.textContent = "VERIFICAÇÃO DE LINKS / EXPLICAÇÃO DO PORQUÊ FAZER ISSO - TEXTO";
        tutorialBoxes.style.animation = 'tutorialBoxesOpacity 1s ease forwards';
        
        tutorialBoxes.style.animation = "none";
        void tutorialBoxes.offsetWidth;
        tutorialBoxes.style.animation = "tutorialBoxesOpacity 0.5s ease forwards";

        tutorialBoxes.style.left = `25px`;
        tutorialBoxes.style.top = `167.667px`;
      break;
      case 4:
        limparInputValue_ResultadoVerificacaoURLDiv();

        tutorialBoxes.style.animation = "none";
        void tutorialBoxes.offsetWidth;
        tutorialBoxes.style.animation = "tutorialBoxesOpacity 0.5s ease forwards";
      break;
      case 5:
        tutorialBoxesButtonDiv[1].textContent = "Repetir";

        tutorialBoxes.style.animation = "none";
        void tutorialBoxes.offsetWidth;
        tutorialBoxes.style.animation = "tutorialBoxesOpacity 0.5s ease forwards";
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
}





tutorialBoxesMinimizeIcons[0].addEventListener('click', function() {
    tutorialBoxes.style.display = 'initial'; 
    tutorialBoxesMinimize.style.display = 'none';
})
tutorialBoxesMinimizeIcons[1].addEventListener('click', function() {
    tutorialBoxesMinimize.style.display = 'none';
    document.body.removeChild(homePageBlurEffect);
})





let tutorialBoxMovendo = false;
let eixo_X, eixo_Y;
tutorialBoxes_tutorialBoxesMinimize[0].addEventListener("mousedown", (e) => {
    tutorialBoxMovendo = true;
    // Calculate the offset from the mouse position to the box's top-left corner
    eixo_X = e.clientX - tutorialBoxes_tutorialBoxesMinimize[0].getBoundingClientRect().left;
    eixo_Y = e.clientY - tutorialBoxes_tutorialBoxesMinimize[0].getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!tutorialBoxMovendo) return;

    // Update the box's position based on the mouse coordinates and initial offset
    tutorialBoxes_tutorialBoxesMinimize[0].style.left = `${e.clientX - eixo_X}px`;
    tutorialBoxes_tutorialBoxesMinimize[0].style.top = `${e.clientY - eixo_Y}px`;
  });

  document.addEventListener("mouseup", () => {
    tutorialBoxMovendo = false;
  });





let tutorialBoxMinimizeMovendo = false;
let eixo_x, eixo_y;
tutorialBoxes_tutorialBoxesMinimize[1].addEventListener("mousedown", (e) => {
    tutorialBoxMinimizeMovendo = true;
    // Calculate the offset from the mouse position to the box's top-left corner
    eixo_x = e.clientX - tutorialBoxes_tutorialBoxesMinimize[1].getBoundingClientRect().left;
    eixo_y = e.clientY - tutorialBoxes_tutorialBoxesMinimize[1].getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!tutorialBoxMinimizeMovendo) return;

    // Update the box's position based on the mouse coordinates and initial offset
    tutorialBoxes_tutorialBoxesMinimize[1].style.left = `${e.clientX - eixo_x}px`;
    tutorialBoxes_tutorialBoxesMinimize[1].style.top = `${e.clientY - eixo_y}px`;
  });

  document.addEventListener("mouseup", () => {
    tutorialBoxMinimizeMovendo = false;
  });