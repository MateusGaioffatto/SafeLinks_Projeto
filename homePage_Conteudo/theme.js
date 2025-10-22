// MODO ESCURO E CLÁRO: VARIÁVEIS CONSTANTES
const modoEscuroClaroElemento = document.getElementById("modoEscuroClaroElementoId"); // VARIÁVEL CONSTANTE, BUTTON
const modoEscuroClaroIcone = document.querySelector("#modoEscuroClaroElementoId i"); // VARIÁVEL CONSTANTE, ÍCONE
const modoEscuroClaroPseudoAnchor = document.querySelector("#modoEscuroClaroElementoId a"); 

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
modoEscuroClaroPseudoAnchor.addEventListener('click', function() {
  if (document.body.classList.contains('dark-mode')) {
    disableDarkMode(); // SELECIONAR MODO CLÁRO: FUNCTION
  } else {
    enableDarkMode(); // SELECIONAR MODO ESCURO: FUNCTION
  }
});

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null);
  modoEscuroClaroIcone.classList.remove("fa-sun");
  modoEscuroClaroIcone.classList.add("fa-moon");
}

function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
  modoEscuroClaroIcone.classList.remove("fa-moon");
  modoEscuroClaroIcone.classList.add("fa-sun");
}





// // theme.js
// document.addEventListener('DOMContentLoaded', () => {
//   const body = document.body;
//   const toggleButton = document.getElementById('modoEscuroClaroElementoId');

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
