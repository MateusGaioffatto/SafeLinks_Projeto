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
  <div id="homePageNavBarMouseOver">
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
              <a href="#" id="openProfileModal"><i class="fas fa-user-cog"></i> Meu Perfil</a>
              <a href="favoritos.html"><i class="fas fa-heart"></i> Favoritos</a>
              <a href="historico.html"><i class="fas fa-history"></i> Histórico</a>
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
  </div>

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
    
    // Função para verificar a segurança da URL
    function verificarUrlSegura(url) {
      const resultadoDiv = document.getElementById('resultadoVerificacao');
      resultadoDiv.style.display = 'block';
      resultadoDiv.innerHTML = '<div style="text-align: center;"><i class="fas fa-spinner fa-spin"></i> Verificando URL...</div>';
      
      fetch('../safe_browsing_api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url })
      })
      .then(response => response.json())
      .then(data => {
        if (data.segura) {
          resultadoDiv.innerHTML = `
            <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px;">
              <i class="fas fa-check-circle"></i> <strong>URL Segura</strong><br>
              A URL ${data.url} é considerada segura.
              <br><strong>Verificado por Safe Browsing</strong>
            </div>
          `;
          
          // Adicionar ao histórico de pesquisas
          adicionarAoHistorico(url);
        } else {
          if (data.erro) {
            resultadoDiv.innerHTML = `
              <div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px;">
                <i class="fas fa-exclamation-triangle"></i> <strong>Erro na Verificação</strong><br>
                ${data.erro}
              </div>
            `;
          } else if (data.ameacas) {
            let ameacasHTML = '';
            data.ameacas.forEach(ameaca => {
              ameacasHTML += `<li><strong>${ameaca.tipo}</strong> em ${ameaca.plataforma}</li>`;
            });
            
            resultadoDiv.innerHTML = `
              <div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px;">
                <i class="fas fa-exclamation-triangle"></i> <strong>URL Não Segura</strong><br>
                A URL ${data.url} contém as seguintes ameaças:
                <ul>${ameacasHTML}</ul>
                <strong>Recomendamos não prosseguir para este site.</strong>
                <br><strong>Verificado por Safe Browsing</strong>
              </div>
            `;
          }
        }
      })
      .catch(error => {
        resultadoDiv.innerHTML = `
          <div style="background-color: #fff3cd; color: #856404; padding: 15px; border-radius: 8px;">
            <i class="fas fa-exclamation-circle"></i> <strong>Erro de Conexão</strong><br>
            Não foi possível verificar a URL no momento. Por favor, tente novamente mais tarde.
  
          </div>
        `;
        console.error('Erro:', error);
      });
    }
    
    // Função para adicionar ao histórico
    function adicionarAoHistorico(url) {
      // Implementar a lógica para adicionar ao histórico de pesquisas
      console.log('Adicionando ao histórico:', url);
      // Aqui você pode implementar a lógica para salvar no banco de dados ou localStorage
    }
    
    // Adicionar evento de clique no botão de pesquisa
    document.getElementById('homePageSearchButtonID').addEventListener('click', function() {
      const url = document.getElementById('homePageSearchInputID').value.trim();
      if (url) {
        verificarUrlSegura(url);
      } else {
        alert('Por favor, digite uma URL para verificar.');
      }
    });
    
    // Adicionar evento de pressionar Enter no campo de pesquisa
    document.getElementById('homePageSearchInputID').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const url = this.value.trim();
        if (url) {
          verificarUrlSegura(url);
        } else {
          alert('Por favor, digite uma URL para verificar.');
        }
      }
    });
  </script>
 
</body>
</html>