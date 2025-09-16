// MODO ESCURO E CLÁRO: VARIÁVEIS CONSTANTES
const modoEscuroClaroLi = document.getElementById("modoEscuroClaroLi"); // VARIÁVEL CONSTANTE, LI ITEM
const modoEscuroClaroButton = document.getElementById("homePageModoEscuroClaroID"); // VARIÁVEL CONSTANTE, BUTTON

// DADOS SALVOS LOCALMENTE AO CARREGAR A PÁGINA: FUNCTION
document.addEventListener('DOMContentLoaded', function() {
  // initializeFavorites();
  // loadSearchHistory();
  
  // MODO ESCURO OU CLARO SALVO LOCALMENTE: IF & ELSE -> FUNCTION
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});





// MODIFICAR MODO ESCURO OU CLÁRO: BUTTON -> FUNCTION
modoEscuroClaroButton.addEventListener('click', function() {
  if (document.body.classList.contains('dark-mode')) {
    disableDarkMode(); // SELECIONAR MODO CLÁRO: FUNCTION
  } else {
    enableDarkMode(); // SELECIONAR MODO ESCURO: FUNCTION
  }
});

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null);
  modoEscuroClaroButton.innerHTML = '<i class="fas fa-moon"></i>';
  modoEscuroClaroButton.title = "Modo escuro"
}

function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
  modoEscuroClaroButton.innerHTML = '<i class="fas fa-sun"></i>';
  modoEscuroClaroButton.title = "Modo cláro"
}





// // theme.js
// document.addEventListener('DOMContentLoaded', () => {
//   const body = document.body;
//   const toggleButton = document.getElementById('homePageModoEscuroClaroID');

//   // Aplica preferência salva
//   if (localStorage.getItem('darkMode') === 'enabled') {
//     body.classList.add('dark-mode');
//     if (toggleButton) toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
//   } else {
//     body.classList.remove('dark-mode');
//     if (toggleButton) toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
//   }

//   // Listener para alternar tema
//   if (toggleButton) {
//     toggleButton.addEventListener('click', () => {
//       body.classList.toggle('dark-mode');

//       if (body.classList.contains('dark-mode')) {
//         localStorage.setItem('darkMode', 'enabled');
//         toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
//       } else {
//         localStorage.setItem('darkMode', null);
//         toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
//       }
//     });
//   }
// });
