// CAMPO DE ANÚNCIOS E PRODUTOS: VARIÁVEIS CONSTANTES
const resultadosProdutosDiv = document.getElementById("resultadosProdutosDivID");
const resultadosProdutosUl = document.getElementById("resultadosProdutosUlID");

// Variáveis para os filtros
let filtroLojasInput, lojasSugestoesDiv, lojasCheckboxesDiv, filtroCategoriasSelect;
let aplicarFiltrosBtn, limparFiltrosBtn;

// Armazenar todos os produtos recebidos da API
let todosProdutos = [];
// Armazenar lojas únicas para o filtro
let lojasUnicas = new Set();

// COMENTAR E ESTUDAR =>
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("query");

// Função para salvar no histórico
async function salvarNoHistorico(product) {
  try {
    const response = await fetch('historico.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        termo: searchQuery,
        produto_nome: product.title,
        produto_url: product.product_link,
        loja_nome: product.source,
        preco: product.price,
        imagem: product.thumbnail
      })
    });
    
    const data = await response.json();
    if (!data.success) {
      console.error('Erro ao salvar no histórico');
    }
  } catch (error) {
    console.error('Erro ao salvar no histórico:', error);
  }
}

// Função para favoritar produto
async function toggleFavorite(product, heartButton, productIndex) {
  const isCurrentlyFavorite = heartButton.classList.contains('active');
  
  try {
    const response = await fetch('favoritos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        acao: isCurrentlyFavorite ? 'remover' : 'adicionar',
        produto_nome: product.title,
        produto_url: product.product_link,
        loja_nome: product.source,
        preco: product.price,
        imagem: product.thumbnail
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      if (isCurrentlyFavorite) {
        heartButton.innerHTML = '<i class="far fa-heart"></i>';
        heartButton.classList.remove('active');
      } else {
        heartButton.innerHTML = '<i class="fas fa-heart"></i>';
        heartButton.classList.add('active');
      }
    } else {
      alert(data.message || 'Erro ao favoritar produto!');
    }
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error);
    alert('Erro ao favoritar produto!');
  }
}

// Carregar favoritos do usuário
async function loadUserFavorites() {
  try {
    const response = await fetch('favoritos.php');
    if (response.ok) {
      const favoritos = await response.json();
      return favoritos.map(fav => fav.produto_url);
    }
  } catch (error) {
    console.error('Erro ao carregar favoritos:', error);
  }
  return [];
}

// Função para inicializar os filtros
function inicializarFiltros() {
  // Inicializar referências aos elementos dos filtros
  filtroLojasInput = document.getElementById('filtroLojas');
  lojasSugestoesDiv = document.getElementById('lojasSugestoesID');
  lojasCheckboxesDiv = document.getElementById('lojasCheckboxesID');
  filtroCategoriasSelect = document.getElementById('filtroCategorias');
  aplicarFiltrosBtn = document.getElementById('aplicarFiltros');
  limparFiltrosBtn = document.getElementById('limparFiltros');
  
  // Preencher checkboxes de lojas
  preencherCheckboxesLojas();
  
  // Configurar event listeners dos filtros
  configurarEventListenersFiltros();
}

// Função para preencher os checkboxes de lojas
function preencherCheckboxesLojas() {
  if (!lojasCheckboxesDiv || lojasUnicas.size === 0) return;
  
  lojasCheckboxesDiv.innerHTML = '';
  
  // Criar checkbox para cada loja única
  lojasUnicas.forEach(loja => {
    if (!loja) return;
    
    const lojaId = loja.replace(/\s+/g, '-').toLowerCase();
    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'loja-checkbox';
    checkboxDiv.innerHTML = `
      <input type="checkbox" id="loja-${lojaId}" name="lojas" value="${loja}" checked>
      <label for="loja-${lojaId}">${loja}</label>
    `;
    lojasCheckboxesDiv.appendChild(checkboxDiv);
  });
}

// Função para configurar os event listeners dos filtros
function configurarEventListenersFiltros() {
  if (!filtroLojasInput || !lojasSugestoesDiv) return;
  
  // Filtro de lojas - input de texto
  filtroLojasInput.addEventListener('input', function() {
    const texto = this.value.toLowerCase();
    if (texto.length > 1) {
      mostrarSugestoesLojas(texto);
    } else {
      lojasSugestoesDiv.style.display = 'none';
    }
  });
  
  // Filtro de lojas - quando clicar fora, esconder sugestões
  document.addEventListener('click', function(e) {
    if (filtroLojasInput && lojasSugestoesDiv && 
        !filtroLojasInput.contains(e.target) && 
        !lojasSugestoesDiv.contains(e.target)) {
      lojasSugestoesDiv.style.display = 'none';
    }
  });
  
  // Botões de ação
  if (aplicarFiltrosBtn) {
    aplicarFiltrosBtn.addEventListener('click', aplicarFiltros);
  }
  
  if (limparFiltrosBtn) {
    limparFiltrosBtn.addEventListener('click', limparFiltros);
  }
}

// Função para mostrar sugestões de lojas
function mostrarSugestoesLojas(texto) {
  if (!lojasSugestoesDiv) return;
  
  const lojasFiltradas = Array.from(lojasUnicas).filter(loja => 
    loja && loja.toLowerCase().includes(texto)
  );
  
  if (lojasFiltradas.length === 0) {
    lojasSugestoesDiv.style.display = 'none';
    return;
  }
  
  lojasSugestoesDiv.innerHTML = '';
  lojasFiltradas.forEach(loja => {
    const div = document.createElement('div');
    div.textContent = loja;
    div.className = 'sugestao-loja';
    div.addEventListener('click', () => {
      // Marcar apenas esta loja no filtro
      marcarApenasEstaLoja(loja);
      filtroLojasInput.value = '';
      lojasSugestoesDiv.style.display = 'none';
    });
    lojasSugestoesDiv.appendChild(div);
  });
  
  lojasSugestoesDiv.style.display = 'block';
}

// Função para marcar apenas uma loja específica
function marcarApenasEstaLoja(loja) {
  if (!lojasCheckboxesDiv) return;
  
  // Desmarcar todos os checkboxes
  const todosCheckboxes = lojasCheckboxesDiv.querySelectorAll('input[type="checkbox"]');
  todosCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Marcar apenas a loja selecionada
  const lojaId = loja.replace(/\s+/g, '-').toLowerCase();
  const checkboxLoja = document.getElementById(`loja-${lojaId}`);
  if (checkboxLoja) {
    checkboxLoja.checked = true;
  }
}

// Função para aplicar os filtros
function aplicarFiltros() {
  if (!todosProdutos.length) return;
  
  // Obter lojas selecionadas
  const lojasSelecionadas = lojasCheckboxesDiv ? 
    Array.from(lojasCheckboxesDiv.querySelectorAll('input:checked'))
      .map(input => input.value) : [];
  
  // Obter categoria selecionada
  const categoriaSelecionada = filtroCategoriasSelect ? filtroCategoriasSelect.value : 'todos';
  
  // Filtrar produtos
  const produtosFiltrados = todosProdutos.filter(produto => {
    // Filtrar por loja
    if (lojasSelecionadas.length > 0 && produto.source && !lojasSelecionadas.includes(produto.source)) {
      return false;
    }
    
    // Filtrar por categoria
    if (categoriaSelecionada !== 'todos' && produto.title) {
      const titulo = produto.title.toLowerCase();
      let correspondeCategoria = false;
      
      switch(categoriaSelecionada) {
        case 'eletronicos':
          correspondeCategoria = titulo.match(/(smartphone|tablet|fone|headphone|watch|tv|televisão|notebook|computador)/);
          break;
        case 'eletrodomesticos':
          correspondeCategoria = titulo.match(/(geladeira|fogão|microondas|máquina de lavar|lavadora|secadora|aspirador|ventilador|ar condicionado)/);
          break;
        case 'informatica':
          correspondeCategoria = titulo.match(/(computador|notebook|pc|mouse|teclado|monitor|impressora|ssd|hd|memória ram)/);
          break;
        case 'celulares':
          correspondeCategoria = titulo.match(/(celular|smartphone|iphone|samsung|motorola|xiaomi|tablet|ipad)/);
          break;
        case 'games':
          correspondeCategoria = titulo.match(/(playstation|xbox|nintendo|switch|video game|controle|jogo)/);
          break;
        case 'livros':
          correspondeCategoria = titulo.match(/(livro|revista|quadrinho|mangá)/);
          break;
        case 'moda':
          correspondeCategoria = titulo.match(/(camiseta|calça|vestido|sapato|tenis|bolsa|roupa|acessório)/);
          break;
        case 'casa':
          correspondeCategoria = titulo.match(/(sofá|cama|mesa|cadeira|armário|guarda-roupa|decoração|almofada|cortina)/);
          break;
        case 'beleza':
          correspondeCategoria = titulo.match(/(perfume|maquiagem|creme|shampoo|condicionador|cosmético|beleza)/);
          break;
        case 'esporte':
          correspondeCategoria = titulo.match(/(bola|raquete|tenis|academia|suplemento|bicicleta|skate|patins)/);
          break;
        default:
          correspondeCategoria = true;
      }
      
      if (!correspondeCategoria) {
        return false;
      }
    }
    
    return true;
  });
  
  console.log('Produtos filtrados:', produtosFiltrados.length);
  // Exibir produtos filtrados
  exibirProdutos(produtosFiltrados);
}

// Função para limpar todos os filtros
function limparFiltros() {
  // Marcar todas as lojas
  if (lojasCheckboxesDiv) {
    const todosCheckboxes = lojasCheckboxesDiv.querySelectorAll('input[type="checkbox"]');
    todosCheckboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  }
  
  // Resetar categoria
  if (filtroCategoriasSelect) {
    filtroCategoriasSelect.value = 'todos';
  }
  
  // Resetar input de lojas
  if (filtroLojasInput) {
    filtroLojasInput.value = '';
  }
  
  // Esconder sugestões de lojas
  if (lojasSugestoesDiv) {
    lojasSugestoesDiv.style.display = 'none';
  }
  
  // Exibir todos os produtos novamente
  exibirProdutos(todosProdutos);
}

// Função para exibir produtos
function exibirProdutos(produtos) {
  if (!resultadosProdutosUl) return;
  
  console.log("Exibindo produtos:", produtos.length);
  
  // Limpar a UL antes de adicionar novos produtos
  resultadosProdutosUl.innerHTML = '';
  
  // Se não há produtos, mostrar mensagem
  if (!produtos || produtos.length === 0) {
    resultadosProdutosUl.innerHTML = '<p class="mensagem-vazio">Nenhum produto encontrado com os filtros aplicados.</p>';
    return;
  }
  
  // Criar e exibir os produtos disponíveis
  produtos.forEach((product, index) => {
    if (index >= 40) return; // Limitar a 40 produtos
    
    // Criar novos elementos para cada produto
    const li = document.createElement('li');
    li.className = "resultadosProdutosLi";
    li.style.display = 'block';

    // Botão de favorito
    const favoritoBtn = document.createElement('button');
    favoritoBtn.className = "favorite-btn";
    favoritoBtn.innerHTML = '<i class="far fa-heart"></i>';
    favoritoBtn.style.position = 'absolute';
    favoritoBtn.style.top = '8px';
    favoritoBtn.style.right = '8px';
    favoritoBtn.style.background = 'none';
    favoritoBtn.style.border = 'none';
    favoritoBtn.style.fontSize = '1.2rem';
    favoritoBtn.style.cursor = 'pointer';
    favoritoBtn.style.zIndex = '10';

    // Imagem do produto
    const foto = document.createElement('img');
    foto.className = "resultadosProdutosLiImg";
    foto.src = product.thumbnail || 'imagem-padrao.jpg';
    foto.alt = product.title || 'Produto';

    // Título do produto
    const texto = document.createElement('h1');
    texto.className = "liProdutosTitulos";
    texto.textContent = product.title || 'Sem título';

    // Preço do produto
    const preco = document.createElement('h2');
    preco.className = "liProdutosPrecos";
    preco.textContent = product.price ? `${product.price}` : 'Preço não disponível';

    // Ícone da loja
    const icone = document.createElement('img');
    icone.className = "liProdutosIconesImagens";
    icone.src = product.source_icon || 'icone-padrao.png';
    icone.alt = product.source || 'Loja';

    // Nome da loja
    const lojaNome = document.createElement('p');
    lojaNome.className = "liProdutosLojasNomes";
    lojaNome.textContent = product.source || 'Loja desconhecida';

    // Link do produto
    const link = document.createElement('a');
    link.className = "resultadosProdutosA";
    link.href = product.product_link || '#';
    link.target = "_blank";

    // Adicionar elementos ao LI
    li.appendChild(favoritoBtn);
    li.appendChild(foto);
    li.appendChild(texto);
    li.appendChild(preco);
    li.appendChild(icone);
    li.appendChild(lojaNome);

    // Adicionar LI ao link
    link.appendChild(li);

    // Adicionar link à UL
    resultadosProdutosUl.appendChild(link);

    // Configurar evento de favorito
    favoritoBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(product, favoritoBtn, index);
    };

    // Configurar evento de histórico
    link.onclick = async () => {
      await salvarNoHistorico(product);
    };
  });
}

// Função principal para buscar produtos
async function fetchProducts() {
  if (!searchQuery) {
    if (resultadosProdutosUl) {
      resultadosProdutosUl.innerHTML = '<p class="mensagem-vazio">Digite um termo de busca para encontrar produtos.</p>';
    }
    return;
  }

  try {
    document.title = 'SafeLinks - ' + searchQuery;
    
    // Mostrar indicador de carregamento
    if (resultadosProdutosUl) {
      resultadosProdutosUl.innerHTML = '<p class="carregando">Carregando produtos...</p>';
    }
    
    // Carregar favoritos do usuário
    const userFavorites = await loadUserFavorites();
    
    const response = await fetch(`../api_search.php?q=${encodeURIComponent(searchQuery)}`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Dados recebidos:', data);

    // Processar e exibir os produtos
    if (data.shopping_results && data.shopping_results.length > 0) {
      // Armazenar todos os produtos
      todosProdutos = data.shopping_results;
      
      // Extrair lojas únicas
      lojasUnicas.clear();
      data.shopping_results.forEach(product => {
        if (product.source) {
          lojasUnicas.add(product.source);
        }
      });
      
      // Exibir produtos
      exibirProdutos(data.shopping_results);
      
      // Inicializar filtros após carregar os produtos
      inicializarFiltros();
      
    } else {
      if (resultadosProdutosUl) {
        resultadosProdutosUl.innerHTML = '<p class="mensagem-vazio">Nenhum produto encontrado para sua busca.</p>';
      }
    }
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    if (resultadosProdutosUl) {
      resultadosProdutosUl.innerHTML = '<p class="mensagem-erro">Erro ao carregar produtos. Por favor, tente novamente.</p>';
    }
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Buscar produtos
  fetchProducts();
});