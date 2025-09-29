const perfilNavbarEsquerdoPerfilButton = document.querySelector(".perfilNavbarEsquerdoDiv button");
const perfilNavbarEsquerdoPerfilUl = document.getElementById("perfilNavbarEsquerdoPerfilUlID");

let perfilButtonClick = 0;
perfilNavbarEsquerdoPerfilButton.addEventListener('click', function() {
    perfilButtonClick++;
    if (perfilButtonClick === 1) {perfilNavbarEsquerdoPerfilUl.style.display = 'none';}
    else {
        perfilNavbarEsquerdoPerfilUl.style.display = 'grid'; 
        perfilButtonClick = 0;
    }
})
