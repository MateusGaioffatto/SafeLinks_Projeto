const perfilNavbarEsquerdo = document.getElementById("perfilNavbarEsquerdoID");

const perfilNavbarEsquerdoDiv = document.getElementById("perfilNavbarEsquerdoDivID");

const perfilNavbarEsquerdoPerfilButton = document.querySelector(".perfilNavbarEsquerdoDiv button");
const perfilNavbarEsquerdoButtonArrowIcon = document.getElementById("perfilNavbarEsquerdoButtonArrowIcon");

const perfilNavbarEsquerdoPerfilUl = document.getElementById("perfilNavbarEsquerdoPerfilUlID");
const perfilNavbarEsquerdoPerfilLi = document.querySelectorAll(".perfilNavbarEsquerdoPerfilUl li");

const perfilDados = document.getElementById("perfilDadosID");
const voltarPerfilUl = document.getElementById("voltarPerfilUlID");
const voltarPerfilUlTexto = document.getElementById("voltarPerfilUlTextoID");





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


console.log(window.innerWidth);
console.log(window.innerHeight);

let perfilLiClick = 0;
perfilNavbarEsquerdoPerfilLi.forEach(li => {
    li.addEventListener('click', function() {
        perfilLiClick++;
        voltarPerfilUlTexto.textContent = li.textContent;
        if (perfilLiClick === 1) {
            perfilDados.style.display = 'grid';
            if (window.innerWidth <= 500) {
                perfilNavbarEsquerdo.style.display = "none";
                voltarPerfilUl.addEventListener('click', function() {
                    nameIt()
                })
            }
        }
        else {
            perfilDados.style.display = 'none';
            perfilLiClick = 0;
        }
    })
})
window.addEventListener('resize', function() {
    if (window.innerHeight <= 500 && perfilNavbarEsquerdo.style.display === "none") {
        voltarPerfilUl.style.display = "flex";
                        voltarPerfilUl.addEventListener('click', function() {
                    nameIt()
                })
    }
})

function nameIt() {
    perfilDados.style.display = "none";
    perfilNavbarEsquerdo.style.display = "flex";
    perfilNavbarEsquerdoDiv.style.display = "grid";  
}