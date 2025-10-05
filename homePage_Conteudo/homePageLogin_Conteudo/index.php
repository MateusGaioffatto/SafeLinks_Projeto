<?php
session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    // Se não estiver logado, redirecionar para a página de login
    header('Location: login.html?message=' . urlencode('Acesso restrito! Faça login.') . '&type=error');
    exit();
}

require_once 'config.php';
?>

<!DOCTYPE html>
<html lang="pt_br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title> SafeLinks - Pesquisa Segura de Produtos </title>

  <link rel="stylesheet" href="../style.css">
  <link rel="stylesheet" href="../homePageNavBarStyle.css">
  <link rel="stylesheet" href="../homePageSearchBarStyle.css">
  <link rel="stylesheet" href="index_php.css">

  <link rel="icon" href="../SafeLinks_Favicon_Logo.png" type="image/png">
  
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
</head>
  
<body>
  <!-- NAVBAR -->
  <nav class="homePageNavbar" id="homePageNavbarID">
    <div class="navbar-container">
      <div class="navbar-logo" id="homePageNavBarLogo"><a href="#"> SafeLinks </a></div>
      <ul class="navbar-links" id="homePageNavBarLinksID">
        <li><a href="#"><i class="fas fa-home"></i> Início </a></li>
        <li><a href="../dicas.html"><i class="fas fa-lightbulb"></i> Dicas </a></li> <!-- NOVO BOTÃO DICAS -->
        <li class="user-menu">
          <button class="user-menu-button">
            <i class="fas fa-user"></i> <?php echo htmlspecialchars($_SESSION['usuario_nome']); ?> <i class="fas fa-caret-down"></i>
          </button>
          <div class="user-dropdown">
            <a href="perfil.html" id="openProfileModal"><i class="fas fa-user-cog"></i> Meu Perfil</a>
            <a href="favoritos.php"><i class="fas fa-heart"></i> Favoritos</a>
            <a href="historico.php"><i class="fas fa-history"></i> Histórico</a>
            <a href="logout.php"><i class="fas fa-sign-out-alt"></i> Sair</a>
          </div>
        </li>
        <li><a href="#"><i class="fa fa-bell" id="notificacoesIcone"></i> Notificações </a></li>
        <li><a href="sobre.html"><i class="fa-solid fa-circle-info"></i> Sobre </a></li>
        <li id="modoEscuroClaroLi">
          <button class="homePageModoEscuroClaro" id="homePageModoEscuroClaroID">
            <i class="fas fa-moon"></i>
          </button>
          <p id="homePageModoEscuroClaroTexto"> Modo </p>
        </li>
      </ul>
      <div class="hamburguerMenu" id="hamburguerMenuID">
        <i class="fas fa-bars"></i>
      </div>
    </div>
  </nav>

  <!-- ... resto do conteúdo permanece igual ... -->

  <div class="homePageConteudoCentral">
    <header>
      <div class="homePageTitulo">SafeLinks</div>
      <div class="homePageSubTitulo">Pesquisa segura em lojas confiáveis</div>
    </header>

    <div class="homePageSearchDiv" id="homePageSearchDivID">
      <div class="homePageBarraDePesquisa" id="homePageBarraDePesquisaID">
        <input type="text" class="homePageSearchInput" id="homePageSearchInputID" autocomplete="off" placeholder="Entre com a URL de um site">
        <button class="homePageSearchButton" id="homePageSearchButtonID" aria-label="Search">
          <i class="material-icons" id="homePageSearchIconID">search</i>
        </button>
      </div>

      <br>

      <div class="barraDePesquisaOpcoes">
        <button class="barraDePesquisaOpcoesButtons" id="barraDePesquisaLimparTexto">
          <i class="fas fa-eraser"></i> Limpar
        </button>
        <button class="barraDePesquisaOpcoesButtons" id="barraDePesquisaHistorico">
          <i class="fas fa-history"></i> Histórico
        </button>
      </div>
    </div>
    
    <!-- Área para mostrar resultados da verificação de segurança -->
    <div id="resultadoVerificacao" style="display: none; margin-top: 20px; padding: 15px; border-radius: 8px;"></div>
    
    <div class="homePageProdutosDiv" id="homePageProdutosDivID">
      <li class="homePageProdutosLi" id="genericoLi" style="display: none;">
        <button class="favorite-btn" data-store="" id="genericoHeartIconButton"><i class="far fa-heart"></i></button>            
        <p class="liProdutosTitulos" id="genericoP" style="display: none;"></p>
      </li>
      <ul class="homePageProdutosUl" id="homePageProdutosUlID">
      </ul>
    </div>

    <div class="homePagePesquisasRecentes" id="homePagePesquisasRecentesID">
      <div class="pesquisasRecentesTitulo">Pesquisas recentes</div>
      <div class="pesquisasRecentesItems" id="pesquisasRecentesItemsID"></div>
    </div>
  </div>

  <!-- Modal de Perfil -->
  <div id="profileModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Meu Perfil</h2>
      <form id="profileForm">
        <div class="form-control">
          <label for="profileName">Nome</label>
          <input type="text" id="profileName" value="<?php echo htmlspecialchars($_SESSION['usuario_nome']); ?>" required>
        </div>
        <div class="form-control">
          <label for="profileEmail">E-mail</label>
          <input type="email" id="profileEmail" value="<?php echo htmlspecialchars($_SESSION['usuario_email']); ?>" required>
        </div>
        <div class="form-control">
          <label for="profilePassword">Nova Senha (deixe em branco para não alterar)</label>
          <input type="password" id="profilePassword">
        </div>
        <div class="form-control">
          <label for="profilePasswordConfirm">Confirmar Nova Senha</label>
          <input type="password" id="profilePasswordConfirm">
        </div>
        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
        <button type="button" id="deleteAccount" class="btn btn-danger">Excluir Conta</button>
      </form>
    </div>
  </div>
 <script src="../theme.js"></script>
   <script src="../script.js"></script>
  <script src="../homePagePesquisaFavoritosHistorico.js"></script>
  <script src="homePageProdutos.js" type="module"></script>
  <script src="index_php.js"></script>
</body>
</html>