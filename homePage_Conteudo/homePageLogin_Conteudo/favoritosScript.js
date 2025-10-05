// Função para escapar caracteres especiais para HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}





// Função para tentar obter imagem do produto
function getProductImageFromData(produto) {
    // Se houver campo de imagem no banco, use-o
    if (produto.imagem) return produto.imagem;
    if (produto.thumbnail) return produto.thumbnail;
    
    // Fallback: tenta extrair de serviços conhecidos pela URL
    if (produto.produto_url) {
        if (produto.produto_url.includes('amazon.')) {
            return 'https://images-na.ssl-images-amazon.com/images/G/32/logo-amazon.png';
        } else if (produto.produto_url.includes('mercadolivre.')) {
            return 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.9/mercadolibre/logo__large@2x.png';
        } else if (produto.produto_url.includes('magazineluiza.')) {
            return 'https://www.magazineluiza.com.br/favicon.ico';
        }
    }
    
    // Fallback final: imagem placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSI gaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuMzVlbSI+UHJvZHV0bzwvdGV4dD48L3N2Zz4=';
}





async function loadFavoritos() {
    try {
        console.log('Carregando favoritos...');
        const response = await fetch('favoritos_API.php');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Dados recebidos:', data);
        
        const favoritosGrid = document.getElementById('favoritosGrid');
        
        if (data.error) {
            favoritosGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Erro ao carregar favoritos</h3>
                    <p>${data.error || 'Tente recarregar a página'}</p>
                </div>
            `;
            return;
        }
        
        if (!data || data.length === 0) {
            favoritosGrid.innerHTML = `
                <div class="empty-state">
                    <i class="far fa-heart"></i>
                    <h3>Nenhum produto favoritado</h3>
                    <p>Os produtos que você favoritar aparecerão aqui</p>
                    <a href="index.php" class="btn-visitar" style="margin-top: 15px;">
                        <i class="fas fa-search"></i> Buscar produtos
                    </a>
                </div>
            `;
            return;
        }
        
        favoritosGrid.innerHTML = data.map(produto => {
            // Escapar todos os dados para prevenir XSS
            const produtoNome = escapeHtml(produto.produto_nome || 'Nome não disponível');
            const produtoUrl = escapeHtml(produto.produto_url || '#');
            const lojaNome = escapeHtml(produto.loja_nome || 'Loja desconhecida');
            const preco = escapeHtml(produto.preco || 'Preço sob consulta');
            
            const dataAdicao = produto.data_adicao ? 
                new Date(produto.data_adicao).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }) : 'Data não disponível';
            
            // Obter imagem do produto
            const produtoImagem = getProductImageFromData(produto);
            
            return `
                <div class="favorito-item">
                    <img src="${produtoImagem}" 
                            alt="${produtoNome}" 
                            class="favorito-imagem"
                            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuMzVlbSI+UHJvZHV0bzwvdGV4dD48L3N2Zz4='">
                    

                            
                    <div class="favorito-conteudo">
                        <h3 class="favorito-titulo" title="${produtoNome}">
                            ${produtoNome}
                        </h3>
                        
                        <div class="favorito-preco">
                            ${preco}
                        </div>
                        
                        <div class="favorito-loja">
                            <img src="${getStoreIcon(lojaNome)}" 
                                    alt="${lojaNome}"
                                    onerror="this.style.display='none'">
                            <span>${lojaNome}</span>
                        </div>
                        
                        <div class="data-adicao">
                            Adicionado em: ${dataAdicao}
                        </div>
                        
                        <div class="favorito-acoes">
                            <a href="${produtoUrl}" 
                                target="_blank" 
                                class="btn-visitar"
                                rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt"></i> Visitar
                            </a>
                            
                            <button class="btn-remover" 
                                    onclick="removerFavorito('${encodeURIComponent(produtoUrl)}')"
                                    title="Remover dos favoritos">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        document.getElementById('favoritosGrid').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erro ao carregar favoritos</h3>
                <p>Verifique sua conexão e tente novamente</p>
                <p style="font-size: 12px; margin-top: 10px;">${error.message}</p>
            </div>
        `;
    }
}

async function removerFavorito(produtoUrlEncoded) {
    const produtoUrl = decodeURIComponent(produtoUrlEncoded);
    
    if (!confirm('Tem certeza que deseja remover este produto dos favoritos?')) return;
    
    try {
        const response = await fetch('favoritos_API.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                produto_url: produtoUrl,
                acao: 'remover'
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message || 'Produto removido dos favoritos!');
            loadFavoritos(); // Recarregar a lista
        } else {
            alert('Erro: ' + (data.message || data.error || 'Tente novamente'));
        }
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        alert('Erro ao remover produto dos favoritos!');
    }
}

// Carregar favoritos ao abrir a página
document.addEventListener('DOMContentLoaded', loadFavoritos);