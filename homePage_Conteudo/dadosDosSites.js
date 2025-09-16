let createDivClick = 0;
let appendDiv = null;

function mostrarDadosDoSite(searchInputText) {
    createDivClick++;
    if (searchInputText === false) {
        if (appendDiv) {
            document.body.removeChild(appendDiv);
        }
        appendDiv = null;
        createDivClick = 0;
    }
    else {
        if (createDivClick === 1) {
            const dadosSiteDiv = document.createElement('div');
            dadosSiteDiv.className = "dadosSiteDiv";
            dadosSiteDiv.textContent = "DADOS DO SITE: " + searchInputText;

            document.body.appendChild(dadosSiteDiv);
            appendDiv = dadosSiteDiv;
        }
        else if (appendDiv) {
            document.body.removeChild(appendDiv);
            appendDiv = null;
        
            createDivClick = 0;
        }
    }
}
    // console.log("URL Válida: ", searchInputText.trim() + "!");
