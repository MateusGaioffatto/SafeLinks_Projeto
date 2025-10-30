const filtrosContainer = document.getElementById("filtrosContainerID");

const resultadosProdutosDiv = document.getElementById("resultadosProdutosDivID"); 
const resultadosProdutosUl = document.getElementById("resultadosProdutosUlID"); 





tutorialBoxes_OverflowControle.style.top = '0px';



document.addEventListener('DOMContentLoaded', function() {
    inicializarFiltros();
    criarElementosProdutos();
    fetchProducts();
});

// Variáveis globais
let produtosLi = []; 
let produtosFoto = []; 
let produtosTexto = []; 
let produtosPreco = []; 
let produtosIcone = []; 
let produtosLojasNomes = []; 
let produtosLink = [];

// Sistema de filtros
let lojasSelecionadas = [];
let todasLojasDisponiveis = [];

// Elementos de filtro
let filtroLojasInput;
let lojasSugestoes;
let lojasCheckboxes;
let filtroCategorias;
let aplicarFiltrosBtn;
let limparFiltrosBtn;

// Parâmetros da URL
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("query");

function inicializarFiltros() {
    console.log("Inicializando filtros...");
    
    // Inicializar elementos de filtro
    filtroLojasInput = document.getElementById('filtroLojasInput');
    lojasSugestoes = document.getElementById('lojasSugestoes');
    lojasCheckboxes = document.getElementById('lojasCheckboxes');
    filtroCategorias = document.getElementById('filtroCategorias');
    aplicarFiltrosBtn = document.getElementById('aplicarFiltrosBtn');
    limparFiltrosBtn = document.getElementById('limparFiltrosBtn');

    // Verificar se elementos foram encontrados
    if (!filtroLojasInput) {
        console.error("Elemento filtroLojasInput não encontrado!");
        return;
    }

    // Event listeners para filtros
    filtroLojasInput.addEventListener('input', function() {
        const valor = this.value.toLowerCase().trim();
        console.log("Input lojas:", valor);
        if (valor.length > 0) {
            mostrarSugestoesLojas(valor);
        } else {
            lojasSugestoes.style.display = 'none';
        }
    });

    filtroLojasInput.addEventListener('focus', function() {
        const valor = this.value.toLowerCase().trim();
        if (valor.length > 0) {
            mostrarSugestoesLojas(valor);
        }
    });

    // Fechar sugestões ao clicar fora
    document.addEventListener('click', function(e) {
        if (filtroLojasInput && lojasSugestoes && 
            !filtroLojasInput.contains(e.target) && 
            !lojasSugestoes.contains(e.target)) {
            lojasSugestoes.style.display = 'none';
        }
    });

    // Event listeners para botões
    if (aplicarFiltrosBtn) {
        aplicarFiltrosBtn.addEventListener('click', aplicarFiltros);
    }
    
    if (limparFiltrosBtn) {
        limparFiltrosBtn.addEventListener('click', limparFiltros);
    }

    console.log("Filtros inicializados com sucesso");
}

function mostrarSugestoesLojas(termo) {
    console.log("Mostrando sugestões para:", termo, "Lojas disponíveis:", todasLojasDisponiveis);
    
    if (todasLojasDisponiveis.length === 0) {
        console.log("Nenhuma loja disponível para sugestões");
        lojasSugestoes.style.display = 'none';
        return;
    }

    const lojasFiltradas = todasLojasDisponiveis.filter(loja => 
        loja && loja.toLowerCase().includes(termo)
    );
    
    console.log("Lojas filtradas:", lojasFiltradas);
    
    lojasSugestoes.innerHTML = '';
    
    if (lojasFiltradas.length > 0) {
        lojasFiltradas.forEach(loja => {
            const div = document.createElement('div');
            div.textContent = loja;
            div.className = 'sugestao-loja';
            div.addEventListener('click', () => {
                console.log("Loja selecionada:", loja);
                adicionarLojaFiltro(loja);
            });
            lojasSugestoes.appendChild(div);
        });
        lojasSugestoes.style.display = 'block';
    } else {
        lojasSugestoes.style.display = 'none';
        // Mostrar mensagem de nenhuma loja encontrada
        const div = document.createElement('div');
        div.textContent = 'Nenhuma loja encontrada';
        div.className = 'sugestao-loja';
        div.style.color = '#999';
        div.style.cursor = 'default';
        lojasSugestoes.appendChild(div);
        lojasSugestoes.style.display = 'block';
    }
}

function criarElementosProdutos() {
    const resultadosProdutosUl = document.getElementById('resultadosProdutosUlID');
    
    if (!resultadosProdutosUl) {
        console.error("Elemento resultadosProdutosUlID não encontrado!");
        return;
    }
    
    // Limpar conteúdo existente
    resultadosProdutosUl.innerHTML = '';
    
    for (let i = 0; i < 40; i++) {
        produtosLi[i] = document.createElement('li');
        produtosLi[i].className = "resultadosProdutosLi";

        // Botão de favoritos
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = 'homePageLogin_Conteudo/logi.php';
            alert('Faça login ou cadastre-se para utilizar esse recurso.');
        });

        produtosFoto[i] = document.createElement('img');
        produtosFoto[i].className = "resultadosProdutosLiImg";
        produtosFoto[i].src = 'https://via.placeholder.com/150'; // Placeholder padrão

        produtosTexto[i] = document.createElement('h1');
        produtosTexto[i].className = "liProdutosTitulos";
        produtosTexto[i].textContent = "Carregando...";

        produtosPreco[i] = document.createElement('h2');
        produtosPreco[i].className = "liProdutosPrecos";
        produtosPreco[i].textContent = "R$ --,--";

        produtosIcone[i] = document.createElement('img');
        produtosIcone[i].className = "liProdutosIconesImagens";
        produtosIcone[i].src = ''; // Vazio por padrão
    
        produtosLojasNomes[i] = document.createElement('p');
        produtosLojasNomes[i].className = "liProdutosLojasNomes";
        produtosLojasNomes[i].textContent = "Loja";

        produtosLink[i] = document.createElement('a');
        produtosLink[i].className = "resultadosProdutosA";
        produtosLink[i].href = "#";

        // Adicionar elementos ao LI
        produtosLi[i].appendChild(favoriteBtn);
        produtosLi[i].appendChild(produtosFoto[i]);
        produtosLi[i].appendChild(produtosTexto[i]); 
        produtosLi[i].appendChild(produtosPreco[i]);
        produtosLi[i].appendChild(produtosIcone[i]);
        produtosLi[i].appendChild(produtosLojasNomes[i]);

        produtosLink[i].appendChild(produtosLi[i]);
        resultadosProdutosUl.appendChild(produtosLink[i]);
        
        // Esconder inicialmente
        produtosLi[i].style.display = 'none';
    }
}

async function fetchProducts() {
    if (!searchQuery) {
        console.log("Nenhuma query de pesquisa");
        mostrarMensagemVazia("Digite um termo de pesquisa para buscar produtos.");
        return;
    }

    try {
        document.title = 'Resultados: ' + searchQuery;
        
        console.log("Buscando produtos para:", searchQuery);
        const response = await fetch(`api_search.php?q=${encodeURIComponent(searchQuery)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Dados recebidos:", data);

        // Coletar lojas disponíveis
        todasLojasDisponiveis = []; // Resetar array
        if (data.shopping_results && data.shopping_results.length > 0) {
            data.shopping_results.forEach(product => {
                if (product.source && !todasLojasDisponiveis.includes(product.source)) {
                    todasLojasDisponiveis.push(product.source);
                }
            });
            console.log("Lojas coletadas:", todasLojasDisponiveis);
            
            exibirProdutos(data);
        } else {
            mostrarMensagemVazia("Nenhum produto encontrado para sua pesquisa.");
        }
        
    } catch (err) {
        console.error("Error fetching products:", err);
        mostrarMensagemVazia("Erro ao carregar produtos. Por favor, tente novamente.");
    }
}

function exibirProdutos(data) {
    // Resetar todos os produtos
    produtosLi.forEach(li => {
        li.style.display = 'none';
    });
    
    if (data.shopping_results && data.shopping_results.length > 0) {
        data.shopping_results.forEach((product, index) => {
            if (index < produtosFoto.length) {
                // Atualizar dados do produto
                produtosFoto[index].src = product.thumbnail || 'https://via.placeholder.com/150';
                produtosFoto[index].alt = product.title || 'Produto';
                
                produtosTexto[index].textContent = product.title || 'Produto sem título';
                produtosPreco[index].textContent = product.price ? `${product.price}` : 'Preço não disponível';
                produtosIcone[index].src = product.source_icon || '';
                produtosIcone[index].alt = `Ícone ${product.source}`;
                produtosLojasNomes[index].textContent = product.source || 'Loja não especificada';
                produtosLink[index].href = product.link || product.product_link || '#';
                produtosLink[index].target = "_blank";
                
                // Mostrar produto
                produtosLi[index].style.display = 'flex';
            }
        });

        // Esconder produtos não utilizados
        for (let i = data.shopping_results.length; i < produtosLi.length; i++) {
            produtosLi[i].style.display = 'none';
        }
    }
}

function mostrarMensagemVazia(mensagem) {
    const resultadosProdutosUl = document.getElementById('resultadosProdutosUlID');
    if (resultadosProdutosUl) {
        resultadosProdutosUl.innerHTML = `<p class="mensagem-vazio">${mensagem}</p>`;
    }
}

// Funções de filtro
function adicionarLojaFiltro(loja) {
    if (!lojasSelecionadas.includes(loja)) {
        lojasSelecionadas.push(loja);
        atualizarCheckboxesLojas();
    }
    filtroLojasInput.value = '';
    lojasSugestoes.style.display = 'none';
}

function atualizarCheckboxesLojas() {
    if (!lojasCheckboxes) return;
    
    lojasCheckboxes.innerHTML = '';
    
    lojasSelecionadas.forEach(loja => {
        const container = document.createElement('div');
        container.className = 'loja-checkbox';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.id = `loja-${loja.replace(/\s+/g, '-')}`;
        checkbox.addEventListener('change', function() {
            if (!this.checked) {
                lojasSelecionadas = lojasSelecionadas.filter(l => l !== loja);
                atualizarCheckboxesLojas();
            }
        });
        
        const label = document.createElement('label');
        label.htmlFor = `loja-${loja.replace(/\s+/g, '-')}`;
        label.textContent = loja;
        
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '';
        removeBtn.className = 'remove-loja';
        removeBtn.addEventListener('click', function() {
            lojasSelecionadas = lojasSelecionadas.filter(l => l !== loja);
            atualizarCheckboxesLojas();
        });
        
        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(removeBtn);
        lojasCheckboxes.appendChild(container);
    });
}

async function aplicarFiltros() {
    if (!searchQuery) {
        console.error("Nenhuma query de pesquisa encontrada");
        return;
    }
    
    try {
        // Construir URL com filtros
        let url = `api_search.php?q=${encodeURIComponent(searchQuery)}`;
        
        if (lojasSelecionadas.length > 0) {
            url += `&lojas=${lojasSelecionadas.map(encodeURIComponent).join(',')}`;
        }
        
        if (filtroCategorias && filtroCategorias.value !== 'todos') {
            url += `&categoria=${encodeURIComponent(filtroCategorias.value)}`;
        }
        
        console.log("URL da requisição:", url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Dados filtrados recebidos:", data);
        
        exibirProdutosFiltrados(data);
        
    } catch (err) {
        console.error("Error applying filters:", err);
        mostrarMensagemVazia("Erro ao aplicar filtros. Tente novamente.");
    }
}

function exibirProdutosFiltrados(data) {
    console.log("Exibindo produtos filtrados:", data);
    
    // Resetar todos os produtos
    produtosLi.forEach(li => {
        li.style.display = 'none';
    });
    
    if (data.shopping_results && data.shopping_results.length > 0) {
        // Aplicar filtros adicionais nos dados recebidos
        let produtosFiltrados = data.shopping_results;
        
        // Filtrar por lojas selecionadas (se houver)
        if (lojasSelecionadas.length > 0) {
            produtosFiltrados = produtosFiltrados.filter(product => 
                product.source && lojasSelecionadas.includes(product.source)
            );
            console.log("Produtos após filtro de lojas:", produtosFiltrados.length);
        }
        
        // Filtrar por categoria (se aplicável)
        if (filtroCategorias && filtroCategorias.value !== 'todos') {
            const categoriaSelecionada = filtroCategorias.value.toLowerCase();
            
            produtosFiltrados = produtosFiltrados.filter(product => {
                // Verificar diferentes possíveis campos de categoria
                const categoriaProduto = (
                    product.category || 
                    product.categoria || 
                    product.product_category || 
                    ''
                ).toLowerCase();
                
                return categoriaProduto.includes(categoriaSelecionada);
            });
            
            console.log("Produtos após filtro de categoria:", produtosFiltrados.length);
            console.log("Categoria selecionada:", categoriaSelecionada);
        }
        
        // Exibir produtos filtrados
        if (produtosFiltrados.length > 0) {
            produtosFiltrados.forEach((product, index) => {
                if (index < produtosFoto.length) {
                    // Atualizar dados do produto
                    produtosFoto[index].src = product.thumbnail || 'https://via.placeholder.com/150';
                    produtosFoto[index].alt = product.title || 'Produto';
                    
                    produtosTexto[index].textContent = product.title || 'Produto sem título';
                    produtosPreco[index].textContent = product.price ? `${product.price}` : 'Preço não disponível';
                    produtosIcone[index].src = product.source_icon || '';
                    produtosIcone[index].alt = `Ícone ${product.source}`;
                    produtosLojasNomes[index].textContent = product.source || 'Loja não especificada';
                    produtosLink[index].href = product.link || product.product_link || '#';
                    produtosLink[index].target = "_blank";
                    
                    // Mostrar produto
                    produtosLi[index].style.display = 'flex';
                }
            });

            // Esconder produtos não utilizados
            for (let i = produtosFiltrados.length; i < produtosLi.length; i++) {
                produtosLi[i].style.display = 'none';
            }
            
            console.log(`Exibidos ${produtosFiltrados.length} produtos filtrados`);
        } else {
            mostrarMensagemVazia("Nenhum produto encontrado com os filtros selecionados.");
        }
    } else {
        mostrarMensagemVazia("Nenhum produto encontrado com os filtros selecionados.");
    }
}

function limparFiltros() {
    // Lógica existente para limpar os filtros na interface
    lojasSelecionadas = [];
    if (filtroCategorias) {
        filtroCategorias.value = 'todos';
    }
    if (lojasCheckboxes) {
        lojasCheckboxes.innerHTML = '';
    }
    if (filtroLojasInput) {
        filtroLojasInput.value = '';
    }
    if (lojasSugestoes) {
        lojasSugestoes.style.display = 'none';
    }

    // Adiciona esta linha para recarregar a página
    window.location.reload(); 

    
    // Recarregar produtos sem filtros
    fetchProducts();
}