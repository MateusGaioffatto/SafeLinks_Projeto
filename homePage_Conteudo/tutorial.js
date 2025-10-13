tutorialBoxesMinusCloseStyles[0].addEventListener('click', function() {
    tutorialBoxes.style.display = 'none'; 
    tutorialBoxesMinimize.style.display = 'inherit';
})
tutorialBoxesMinusCloseStyles[1].addEventListener('click', function() {
  tutorialBoxes.style.display = 'none'; 
  document.body.removeChild(homePageBlurEffect);
})





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