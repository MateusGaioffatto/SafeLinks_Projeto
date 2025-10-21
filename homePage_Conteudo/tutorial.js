// const tutorialBoxes_OverflowControle = document.getElementById('tutorialBoxes_OverflowControleId');
// const homePageBlurEffect = document.getElementById("homePageBlurEffectID");
// const tutorialBoxes = document.getElementById("tutorialBoxesID");

// const tutorialBoxes_posicionamento = tutorialBoxes.getBoundingClientRect();

// const tutorialBoxesH5 = document.querySelector(".tutorialBoxesCloseIcone h5");
// const tutorialBoxesCloseIcone = document.querySelector(".tutorialBoxesCloseIcone i");

// const tutorialBoxesGifs = document.querySelector(".tutorialBoxesImagensStyles img")

// let tutorialBoxesTexto = document.querySelector(".tutorialBoxes p");





tutorialBoxesCloseIcone.addEventListener('click', function() {
  searchInputDiv.style.pointerEvents = 'initial';
  tutorialBoxes.style.display = 'none'; 
  document.body.removeChild(tutorialBoxes_OverflowControle);
})


console.log(window.innerWidth, window.innerHeight);


 if (window.innerWidth <= 810 || window.innerHeight < 900) {
  tutorialBoxes.style.left = '50%';
  tutorialBoxes.style.transform = 'translateX(-50%)';
}





let tutorialBoxMovendo = false;
let eixo_X, eixo_Y;
tutorialBoxes.addEventListener("mousedown", (e) => {
    tutorialBoxMovendo = true;
    // Calculate the offset from the mouse position to the box's top-left corner
    eixo_X = e.clientX - tutorialBoxes.getBoundingClientRect().left;
    eixo_Y = e.clientY - tutorialBoxes.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (!tutorialBoxMovendo) return;

  // Update the box's position based on the mouse coordinates and initial offset
  tutorialBoxes.style.left = `${e.clientX - eixo_X}px`;
  tutorialBoxes.style.top = `${e.clientY - eixo_Y}px`;
});

document.addEventListener("mouseup", () => {
  tutorialBoxMovendo = false;
});





let initial_X, initial_Y, eixoMobile_X = 0, eixoMobile_Y = 0;

tutorialBoxes.addEventListener('touchstart', tutorialBoxMovendo_InicioMovimento);
tutorialBoxes.addEventListener('touchend', tutorialBoxMovendo_FimMovimento);
tutorialBoxes.addEventListener('touchmove', tutorialBoxMovendo_Movimentando);

function tutorialBoxMovendo_InicioMovimento(e) {
    initial_X = e.touches[0].clientX - eixoMobile_X;
    initial_Y = e.touches[0].clientY - eixoMobile_Y;
    tutorialBoxMovendo = true;
}

function tutorialBoxMovendo_FimMovimento(e) {
    initial_X = eixoMobile_X;
    initial_Y = eixoMobile_Y;
    tutorialBoxMovendo = false;
}

function tutorialBoxMovendo_Movimentando(e) {
  if (tutorialBoxMovendo) {
      e.preventDefault(); // Prevent scrolling while dragging
      eixoMobile_X = e.touches[0].clientX - initial_X;
      eixoMobile_Y = e.touches[0].clientY - initial_Y;

      setTranslate(eixoMobile_X, eixoMobile_Y, tutorialBoxes);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}