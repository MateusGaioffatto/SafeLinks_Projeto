// CAMPO DE ANÚNCIOS E PRODUTOS: VARIÁVEIS CONSTANTES
const resultadosProdutosDiv = document.getElementById("resultadosProdutosDivID");
const resultadosProdutosUl = document.getElementById("resultadosProdutosUlID");

// Variáveis para os filtros
let filtroLojasInput = null;
let lojasSugestoesDiv = null;
let lojasCheckboxesDiv = null;
let filtroCategoriasSelect = null;
let aplicarFiltrosBtn = null;
let limparFiltrosBtn = null;

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
  const filtrosContainer = document.getElementById('filtrosContainerID');
  
  // Adicionar o conteúdo HTML dos filtros
  filtrosContainer.innerHTML = `
    <div class="filtro-grupo">
      <h3>Filtros</h3>
      
      <!-- Filtro de Lojas -->
      <div class="filtro-item">
        <label for="filtroLojas">Lojas:</label>
        <div class="filtro-lojas-input-container">
          <input type="text" id="filtroLojas" placeholder="Digite o nome da loja" class="filtro-input">
          <div class="lojas-sugestoes" id="lojasSugestoesID"></div>
        </div>
        <div class="lojas-checkboxes" id="lojasCheckboxesID"></div>
      </div>
      
      <!-- Filtro de Categorias -->
      <div class="filtro-item">
        <label for="filtroCategorias">Categorias:</label>
        <select id="filtroCategorias" class="filtro-select">
          <option value="todos">Todos os produtos</option>
          <option value="eletronicos">Eletrônicos</option>
          <option value="eletrodomesticos">Eletrodomésticos</option>
          <option value="informatica">Informática</option>
          <option value="celulares">Celulares e Tablets</option>
          <option value="games">Games</option>
          <option value="livros">Livros</option>
          <option value="moda">Moda</option>
          <option value="casa">Casa e Decoração</option>
          <option value="beleza">Beleza e Saúde</option>
          <option value="esporte">Esporte e Lazer</option>
        </select>
      </div>
      
      <!-- Botões de ação -->
      <div class="filtro-botoes">
        <button id="aplicarFiltros" class="filtro-btn aplicar">Aplicar Filtros</button>
        <button id="limparFiltros" class="filtro-btn limpar">Limpar Filtros</button>
      </div>
    </div>
  `;
  
  // Inicializar referências aos elementos dos filtros
  filtroLojasInput = document.getElementById('filtroLojas');
  lojasSugestoesDiv = document.getElementById('lojasSugestoesID');
  lojasCheckboxesDiv = document.getElementById('lojasCheckboxesID');
  filtroCategoriasSelect = document.getElementById('filtroCategorias');
  aplicarFiltrosBtn = document.getElementById('aplicarFiltros');
  limparFiltrosBtn = document.getElementById('limparFiltros');
  
  // Configurar event listeners dos filtros
  configurarEventListenersFiltros();
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
      adicionarLojaAoFiltro(loja);
      filtroLojasInput.value = '';
      lojasSugestoesDiv.style.display = 'none';
    });
    lojasSugestoesDiv.appendChild(div);
  });
  
  lojasSugestoesDiv.style.display = 'block';
}

// Função para adicionar uma loja ao filtro
function adicionarLojaAoFiltro(loja) {
  if (!lojasCheckboxesDiv || !loja) return;
  
  // Verificar se já existe um checkbox para esta loja
  const lojaId = loja.replace(/\s+/g, '-').toLowerCase();
  if (document.getElementById(`loja-${lojaId}`)) {
    return;
  }
  
  // Criar checkbox para a loja
  const div = document.createElement('div');
  div.className = 'loja-checkbox';
  div.innerHTML = `
    <input type="checkbox" id="loja-${lojaId}" value="${loja}" checked>
    <label for="loja-${lojaId}">${loja}</label>
    <button type="button" class="remover-loja" data-loja="${loja}">×</button>
  `;
  lojasCheckboxesDiv.appendChild(div);
  
  // Adicionar evento para remover a loja
  const removerBtn = div.querySelector('.remover-loja');
  removerBtn.addEventListener('click', function() {
    div.remove();
  });
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
    
    // Filtrar por categoria (implementação básica)
    if (categoriaSelecionada !== 'todos' && produto.title) {
      const titulo = produto.title.toLowerCase();
      
      switch(categoriaSelecionada) {
        case 'eletronicos':
          if (!titulo.match(/(smartphone|tablet|fone|headphone|watch|tv|televisão|notebook|computador)/)) return false;
          break;
        case 'eletrodomesticos':
          if (!titulo.match(/(geladeira|fogão|microondas|máquina de lavar|lavadora|secadora|aspirador|ventilador|ar condicionado)/)) return false;
          break;
        case 'informatica':
          if (!titulo.match(/(computador|notebook|pc|mouse|teclado|monitor|impressora|ssd|hd|memória ram)/)) return false;
          break;
        case 'celulares':
          if (!titulo.match(/(celular|smartphone|iphone|samsung|motorola|xiaomi|tablet|ipad)/)) return false;
          break;
        case 'games':
          if (!titulo.match(/(playstation|xbox|nintendo|switch|video game|controle|jogo)/)) return false;
          break;
        case 'livros':
          if (!titulo.match(/(livro|revista|quadrinho|mangá)/)) return false;
          break;
        case 'moda':
          if (!titulo.match(/(camiseta|calça|vestido|sapato|tenis|bolsa|roupa|acessório)/)) return false;
          break;
        case 'casa':
          if (!titulo.match(/(sofá|cama|mesa|cadeira|armário|guarda-roupa|decoração|almofada|cortina)/)) return false;
          break;
        case 'beleza':
          if (!titulo.match(/(perfume|maquiagem|creme|shampoo|condicionador|cosmético|beleza)/)) return false;
          break;
        case 'esporte':
          if (!titulo.match(/(bola|raquete|tenis|academia|suplemento|bicicleta|skate|patins)/)) return false;
          break;
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
  // Limpar checkboxes de lojas
  if (lojasCheckboxesDiv) {
    lojasCheckboxesDiv.innerHTML = '';
  }
  
  // Resetar categoria
  if (filtroCategoriasSelect) {
    filtroCategoriasSelect.value = 'todos';
  }
  
  // Resetar input de lojas
  if (filtroLojasInput) {
    filtroLojasInput.value = '';
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
    favoritoBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await toggleFavorite(product, favoritoBtn, index);
    });

    // Configurar evento de clique para salvar no histórico
    link.addEventListener('click', async () => {
      await salvarNoHistorico(product);
    });
  });
}

// Função para buscar produtos da API
async function buscarProdutosAPI(query) {
  try {
    const response = await fetch(`https://api.safelinks.com.br/produtos?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data.produtos || [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    // Fallback para dados de exemplo em caso de erro
    return gerarProdutosExemplo(query);
  }
}

// Função para gerar produtos de exemplo (fallback)
function gerarProdutosExemplo(query) {
  const produtosExemplo = [];
  const lojas = ['Amazon', 'Mercado Livre', 'Magazine Luiza', 'Americanas', 'Submarino'];
  const categorias = ['Smartphone', 'Notebook', 'Fone de Ouvido', 'Tablet', 'Smartwatch'];
  
  for (let i = 0; i < 20; i++) {
    const loja = lojas[Math.floor(Math.random() * lojas.length)];
    const categoria = categorias[Math.floor(Math.random() * categorias.length)];
    
    produtosExemplo.push({
      title: `${categoria} ${query} Modelo ${i+1}`,
      price: `R$ ${(Math.random() * 2000 + 100).toFixed(2)}`,
      product_link: `https://${loja.toLowerCase().replace(' ', '')}.com/produto${i+1}`,
      thumbnail: `https://via.placeholder.com/150?text=${encodeURIComponent(categoria)}`,
      source: loja,
      source_icon: `https://via.placeholder.com/30?text=${loja.charAt(0)}`
    });
  }
  
  return produtosExemplo;
}

// Função principal para carregar os produtos
async function carregarProdutos() {
  if (!searchQuery) {
    console.error('Nenhum termo de pesquisa encontrado na URL');
    return;
  }
  
  try {
    // Buscar produtos da API
    const produtos = await buscarProdutosAPI(searchQuery);
    
    if (!produtos || produtos.length === 0) {
      console.log('Nenhum produto encontrado');
      resultadosProdutosUl.innerHTML = '<p class="mensagem-vazio">Nenhum produto encontrado para sua pesquisa.</p>';
      return;
    }
    
    // Armazenar todos os produtos
    todosProdutos = produtos;
    
    // Coletar lojas únicas para o filtro
    produtos.forEach(produto => {
      if (produto.source) {
        lojasUnicas.add(produto.source);
      }
    });
    
    // Inicializar os filtros
    inicializarFiltros();
    
    // Exibir todos os produtos inicialmente
    exibirProdutos(todosProdutos);
    
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    resultadosProdutosUl.innerHTML = '<p class="mensagem-vazio">Erro ao carregar produtos. Tente novamente.</p>';
  }
}

// Iniciar carregamento quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarProdutos);