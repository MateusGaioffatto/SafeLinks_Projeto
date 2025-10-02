const perfilNavbarEsquerdoPerfilButton = document.querySelector(".perfilNavbarEsquerdoDiv button");
const perfilNavbarEsquerdoButtonArrowIcon = document.getElementById("perfilNavbarEsquerdoButtonArrowIcon");

const perfilNavbarEsquerdoPerfilUl = document.getElementById("perfilNavbarEsquerdoPerfilUlID");
const perfilNavbarEsquerdoPerfilLi = document.querySelectorAll(".perfilNavbarEsquerdoPerfilUl li");

const perfilDados = document.getElementById("perfilDadosID");





let perfilButtonClick = 0;
perfilNavbarEsquerdoPerfilButton.addEventListener('click', function() {
    perfilButtonClick++;
    if (perfilButtonClick === 1) {
        perfilNavbarEsquerdoButtonArrowIcon.classList.remove("fa-angle-up");
        perfilNavbarEsquerdoButtonArrowIcon.classList.add("fa-angle-down");
        perfilNavbarEsquerdoPerfilUl.style.display = 'none';
    }
    else {
        perfilNavbarEsquerdoPerfilUl.style.display = 'grid'; 
        perfilNavbarEsquerdoButtonArrowIcon.classList.remove("fa-angle-down");
        perfilNavbarEsquerdoButtonArrowIcon.classList.add("fa-angle-up");
        perfilButtonClick = 0;
    }
})




let perfilLiClick = 0;
perfilNavbarEsquerdoPerfilLi.forEach(li => {
    li.addEventListener('click', function() {
        perfilLiClick++;
        if (perfilLiClick === 1) {
            perfilDados.style.display = 'block';
        }
        else {
            perfilDados.style.display = 'none';
            perfilLiClick = 0;
        }
    })
})





