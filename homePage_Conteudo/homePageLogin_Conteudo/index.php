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
  <link rel="icon" href="SafeLinks_Favicon_Logo.png" type="image/png">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    /* Estilos para o menu de usuário */
    .user-menu {
      position: relative;
      display: inline-block;
    }
    
    .user-menu-button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
    
    .user-dropdown {
      display: none;
      position: absolute;
      right: 0;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      border-radius: 5px;
      overflow: hidden;
    }
    
    .user-dropdown a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      transition: background-color 0.3s;
    }
    
    .user-dropdown a:hover {
      background-color: #f1f1f1;
    }
    
    .user-menu:hover .user-dropdown {
      display: block;
    }
    
    /* Modal de perfil */
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
    }
    
    .modal-content {
      background-color: #fefefe;
      margin: 10% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 500px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }
    
    .close:hover {
      color: black;
    }
    
    .form-control {
      margin-bottom: 15px;
    }
    
    .form-control label {
      display: block;
      margin-bottom: 5px;
    }
    
    .form-control input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
    }
    
    .btn-primary {
      background-color: #3498db;
      color: white;
    }
    
    .btn-danger {
      background-color: #e74c3c;
      color: white;
    }
  </style>
</head>
  
<body>
  <!-- NAVBAR -->
  <div id="homePageNavBarMouseOver">
    <nav class="homePageNavbar" id="homePageNavbarID">
      <div class="navbar-container">
        <div class="navbar-logo" id="homePageNavBarLogo"><a href="#"> SafeLinks </a></div>
        <ul class="navbar-links" id="homePageNavBarLinksID">
          <li><a href="#"><i class="fas fa-home"></i> Início </a></li>
          <li class="user-menu">
            <button class="user-menu-button">
              <i class="fas fa-user"></i> <?php echo htmlspecialchars($_SESSION['usuario_nome']); ?> <i class="fas fa-caret-down"></i>
            </button>
            <div class="user-dropdown">
              <a href="#" id="openProfileModal"><i class="fas fa-user-cog"></i> Meu Perfil</a>
              <a href="#" id="viewFavorites"><i class="fas fa-heart"></i> Favoritos</a>
              <a href="#" id="viewHistory"><i class="fas fa-history"></i> Histórico</a>
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
        <div class="navbar-toggle" id="navbarToggle">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  </div>

  <div class="homePageConteudoCentral">
    <header>
      <div class="homePageTitulo">SafeLinks</div>
      <div class="homePageSubTitulo">Pesquisa segura em lojas confiáveis</div>
    </header>

    <div class="homePageSearchDiv" id="homePageSearchDivID">
      <div class="homePageBarraDePesquisa" id="homePageBarraDePesquisaID">
        <input type="text" class="homePageSearchInput" id="homePageSearchInputID" autocomplete="off">
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

  <script src="script.js"></script>
  <script src="homePagePesquisaFavoritosHistorico.js"></script>
  <script src="homePageProdutos.js" type="module"></script>
  
  <script>
    // Modal de perfil
    const modal = document.getElementById("profileModal");
    const btn = document.getElementById("openProfileModal");
    const span = document.getElementsByClassName("close")[0];
    
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    
    // Envio do formulário de perfil
    document.getElementById("profileForm").addEventListener("submit", function(e) {
      e.preventDefault();
      
      const name = document.getElementById("profileName").value;
      const email = document.getElementById("profileEmail").value;
      const password = document.getElementById("profilePassword").value;
      const passwordConfirm = document.getElementById("profilePasswordConfirm").value;
      
      if (password !== passwordConfirm) {
        alert("As senhas não coincidem!");
        return;
      }
      
      // Enviar dados para atualização via AJAX
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (password) formData.append('password', password);
      
      fetch('update_profile.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Perfil atualizado com sucesso!");
          modal.style.display = "none";
          // Atualizar o nome no menu
          document.querySelector('.user-menu-button').innerHTML = `<i class="fas fa-user"></i> ${name} <i class="fas fa-caret-down"></i>`;
        } else {
          alert("Erro: " + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Erro ao atualizar perfil.");
      });
    });
    
    // Excluir conta
    document.getElementById("deleteAccount").addEventListener("click", function() {
      if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
        fetch('delete_account.php', {
          method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert("Conta excluída com sucesso!");
            window.location.href = "login.html";
          } else {
            alert("Erro: " + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert("Erro ao excluir conta.");
        });
      }
    });
    
    // Ver favoritos
    document.getElementById("viewFavorites").addEventListener("click", function(e) {
      e.preventDefault();
      alert("Abrindo página de favoritos...");
      // Aqui você pode implementar a exibição dos favoritos
    });
    
    // Ver histórico
    document.getElementById("viewHistory").addEventListener("click", function(e) {
      e.preventDefault();
      alert("Abrindo página de histórico...");
      // Aqui você pode implementar a exibição do histórico
    });
  </script>
</body>
</html>
