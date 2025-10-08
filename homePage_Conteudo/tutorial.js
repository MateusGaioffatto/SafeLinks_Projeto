const tutorialBoxesStyles = document.getElementById("tutorialBoxesStylesID");
const tutorialBoxesMinusCloseStyles = document.querySelectorAll(".tutorialBoxesMinusCloseStyles i");
const tutorialBoxesGifs = document.querySelector(".tutorialBoxesImagensStyles img")
const tutorialBoxesButtonDivStyles = document.querySelectorAll(".tutorialBoxesButtonDivStyles button");
const tutorialBoxesMinimizeStyles = document.getElementById("tutorialBoxesMinimizeStylesID")
const tutorialBoxesMinimizeIcons = document.querySelectorAll(".tutorialBoxesMinimizeStyles i");





tutorialBoxesMinusCloseStyles[0].addEventListener('click', function() {
    tutorialBoxesStyles.style.display = 'none'; 
    tutorialBoxesMinimizeStyles.style.display = 'inherit';
})
tutorialBoxesMinusCloseStyles[1].addEventListener('click', function() {
    tutorialBoxesStyles.style.display = 'none'; 
})

let tutorialGifCount = 1;
tutorialBoxesButtonDivStyles[1].addEventListener('click', function() {
    tutorialGifCount++;
    if (tutorialGifCount === 6) {tutorialGifCount = 1;}
    tutorialBoxesGifs.src = `homePageTutoriais_GIFs/Tutorial0${tutorialGifCount}.gif`
})

tutorialBoxesMinimizeIcons[0].addEventListener('click', function() {
    tutorialBoxesStyles.style.display = 'inherit'; 
    tutorialBoxesMinimizeStyles.style.display = 'none';
})



let tutorialBoxMovendo = false;
let eixo_X, eixo_Y;

tutorialBoxesStyles.addEventListener("mousedown", (e) => {
  tutorialBoxMovendo = true;
  // Calculate the offset from the mouse position to the box's top-left corner
  eixo_X = e.clientX - tutorialBoxesStyles.getBoundingClientRect().left;
  eixo_Y = e.clientY - tutorialBoxesStyles.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (!tutorialBoxMovendo) return;

  // Update the box's position based on the mouse coordinates and initial offset
  tutorialBoxesStyles.style.left = `${e.clientX - eixo_X}px`;
  tutorialBoxesStyles.style.top = `${e.clientY - eixo_Y}px`;
});

document.addEventListener("mouseup", () => {
  tutorialBoxMovendo = false;
});
