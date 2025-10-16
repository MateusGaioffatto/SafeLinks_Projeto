document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('modoEscuroClaroElementoId');
    const body = document.body;
    
    if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', null);
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    });
    




// MENU HAMBURGUER: VARIÁVEIS
const menuHamburguerElemento = document.getElementById("menuHamburguerElementoId");
const navBarLinks = document.getElementById("navBarLinksId");
const homePageWindowLargura = window.matchMedia("(max-width: 768px)");
let navBarClickContagem = 0;

// MENU HAMBURGUER: FUNÇÕES
menuHamburguerElemento.addEventListener("click", () => { 
  navBarClickContagem++;
  if (navBarClickContagem === 1) {navBarLinks.style.opacity = 1;}
  else {
    navBarLinks.style.opacity = 0; 
    navBarClickContagem = 0;
  }
});
homePageWindowLargura.addEventListener("change", () => {
  if (!homePageWindowLargura.matches) {
      navBarLinks.style.opacity = 1;
      navBarClickContagem = 0;
  }
  else {navBarLinks.style.opacity = 0;}
});





    // Adicionar animação de digitação no título
    const title = document.querySelector('.about-title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    function typeWriter() {
    if (i < originalText.length) {
        title.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
    }
    
    setTimeout(typeWriter, 500);
});