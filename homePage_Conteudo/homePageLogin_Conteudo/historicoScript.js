// MENU HAMBURGUER: VARIÁVEIS
const menuHamburguerElemento = document.getElementById("menuHamburguerElementoId");
const navBarLinks = document.getElementById("historicoNavBarLinksID");
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





async function loadHistorico() {
    try {
        const response = await fetch('historico.php');
        const historico = await response.json();
        
        const historicoList = document.getElementById('historicoList');
        
        if (historico.length === 0) {
            historicoList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>Nenhuma pesquisa realizada</h3>
                    <p>Suas pesquisas aparecerão aqui</p>
                </div>
            `;
            return;
        }
        
        historicoList.innerHTML = historico.map(item => `
            <div class="historico-item">
                <div style="display: flex; align-items: center;">
                    ${item.imagem ? `
                        <img src="${item.imagem}" alt="${item.produto_nome}" 
                                style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 15px;">
                    ` : ''}
                    <div>
                        <div class="historico-termo">${item.produto_nome || item.termo_pesquisa}</div>
                        ${item.loja_nome ? `
                            <div style="font-size: 14px; color: #666; margin: 5px 0;">
                                <strong>Loja:</strong> ${item.loja_nome} | 
                                <strong>Preço:</strong> ${item.preco || 'N/A'}
                            </div>
                        ` : ''}
                        <div class="historico-data">Pesquisado em: ${new Date(item.data_pesquisa).toLocaleString('pt-BR')}</div>
                        <div class="historico-data">Termo: "${item.termo_pesquisa}"</div>
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-pesquisar" onclick="pesquisarNovamente('${item.termo_pesquisa}')">
                        <i class="fas fa-search"></i> Pesquisar
                    </button>
                    ${item.produto_url ? `
                        <button class="btn-pesquisar" onclick="abrirProduto('${item.produto_url}')" 
                                style="background: var(--secondary);">
                            <i class="fas fa-external-link-alt"></i> Abrir
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        document.getElementById('historicoList').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erro ao carregar histórico</h3>
                <p>Tente recarregar a página</p>
            </div>
        `;
    }
}

function pesquisarNovamente(termo) {
    // Esta função apenas redireciona para a página de resultados
    // Não deve salvar no histórico
    window.location.href = `resultadosProdutos.html?query=${encodeURIComponent(termo)}`;
}

function abrirProduto(url) {
    window.open(url, '_blank');
}

// Carregar histórico ao abrir a página
document.addEventListener('DOMContentLoaded', loadHistorico);