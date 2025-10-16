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
      const resultadoVerificacaoURL = document.getElementById('resultadoVerificacaoURL');
      resultadoVerificacaoURL.style.display = 'block';
      resultadoVerificacaoURL.innerHTML = '<div style="text-align: center;"><i class="fas fa-spinner fa-spin"></i> Verificando URL...</div>';
      
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
          resultadoVerificacaoURL.innerHTML = `
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
            resultadoVerificacaoURL.innerHTML = `
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
            
            resultadoVerificacaoURL.innerHTML = `
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
        resultadoVerificacaoURL.innerHTML = `
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
    document.getElementById('searchButtonId').addEventListener('click', function() {
      const url = document.getElementById('searchInputId').value.trim();
      if (url) {
        verificarUrlSegura(url);
      } else {
        alert('Por favor, digite uma URL para verificar.');
      }
    });
    
    // Adicionar evento de pressionar Enter no campo de pesquisa
    document.getElementById('searchInputId').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const url = this.value.trim();
        if (url) {
          verificarUrlSegura(url);
        } else {
          alert('Por favor, digite uma URL para verificar.');
        }
      }
    });