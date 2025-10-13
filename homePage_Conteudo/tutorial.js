tutorialBoxesCloseIcone.addEventListener('click', function() {
  searchInputDiv.style.pointerEvents = 'initial';
  tutorialBoxes.style.display = 'none'; 
  document.body.removeChild(homePageBlurEffect);
})





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