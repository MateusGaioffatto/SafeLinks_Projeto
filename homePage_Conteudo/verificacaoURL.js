      // Função para verificar a segurança da URL
      function verificarUrlSegura(url) {
        resultadoVerificacaoURL.style.display = 'block';
        resultadoVerificacaoURL.innerHTML = '<div style="text-align: center;"><i class="fas fa-spinner fa-spin"></i> Verificando URL...</div>';
        
        fetch('safe_browsing_api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: url })
        })
        .then(response => response.json())
        .then(data => {
          if (data.segura) {
            segurancaStatusURL = 0; // 0 => URL SEGURA!
            resultadoVerificacaoURL.innerHTML = `
              <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px;">
                <i class="fas fa-check-circle"></i> <strong>URL Segura</strong><br>
                A URL ${data.url} é considerada segura.
                <br><strong>Verificado por Safe Browsing</strong>
              </div>
            `;
            
            // Adicionar ao histórico de pesquisas
            adicionarAoHistorico(url);
          } 
          else {
            if (data.erro) {
              segurancaStatusURL = 1; // 1 => ERRO NA VERIFICAÇÃO DE URL
              resultadoVerificacaoURL.innerHTML = `
                <div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px;">
                  <i class="fas fa-exclamation-triangle"></i> <strong>Erro na Verificação</strong><br>
                  ${data.erro}
                </div>
              `;
            } 
            else if (data.ameacas) {
              segurancaStatusURL = 2; // 2 => URL NÃO SEGURA!
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
        // Aqui você pode implementar a lógica para salvar no localStorage
        let historico = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (!historico.includes(url)) {
          historico.unshift(url);
          // Manter apenas os últimos 10 itens
          historico = historico.slice(0, 10);
          localStorage.setItem('searchHistory', JSON.stringify(historico));
          
          // Atualizar a exibição do histórico
          atualizarExibicaoHistorico();
        }
      }
      
      // Função para atualizar a exibição do histórico
      function atualizarExibicaoHistorico() {
        const historicoItems = document.getElementById('pesquisasRecentesItemsId');
        const historico = JSON.parse(localStorage.getItem('searchHistory')) || [];
        
        historicoItems.innerHTML = '';
        
        historico.forEach(url => {
          const item = document.createElement('div');
          item.className = 'pesquisaRecenteItem';
          item.textContent = url;
          item.style.cursor = 'pointer';
          item.style.margin = '5px 0';
          item.style.padding = '5px';
          item.style.borderRadius = '4px';
          item.style.backgroundColor = '#f0f0f0';
          item.addEventListener('click', () => {
            document.getElementById('searchInputId').value = url;
            verificarUrlSegura(url);
          });
          
          historicoItems.appendChild(item);
        });
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
      
      // Inicializar a exibição do histórico
      document.addEventListener('DOMContentLoaded', function() {
        atualizarExibicaoHistorico();
      });