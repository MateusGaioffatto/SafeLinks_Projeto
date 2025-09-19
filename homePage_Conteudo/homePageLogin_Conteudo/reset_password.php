<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Exibir formulário de redefinição
    $token = filter_input(INPUT_GET, 'token', FILTER_SANITIZE_STRING);
    
    if (empty($token)) {
        die('Token inválido.');
    }
    
    // Verificar se o token é válido
    try {
        $conn = getDBConnection();
        $stmt = $conn->prepare("SELECT prt.*, u.email 
                               FROM password_reset_tokens prt 
                               JOIN usuarios u ON prt.usuario_id = u.id 
                               WHERE prt.token = :token AND prt.used = 0 AND prt.expiry_date > NOW()");
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        
        if ($stmt->rowCount() === 1) {
            $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);
            // Exibir formulário de redefinição
            ?>
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Redefinir Senha - SafeLinks</title>
                <link rel="stylesheet" href="styleLogin.css">
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Redefinir Senha</h2>
                    </div>
                    <div class="form-container">
                        <form method="POST" action="reset_password.php">
                            <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">
                            
                            <div class="form-control">
                                <label for="new-password">Nova Senha</label>
                                <input type="password" id="new-password" name="new_password" placeholder="Digite sua nova senha" required>
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-exclamation-circle"></i>
                                <small>Mensagem de erro</small>
                            </div>
                            
                            <div class="form-control">
                                <label for="confirm-password">Confirmar Nova Senha</label>
                                <input type="password" id="confirm-password" name="confirm_password" placeholder="Confirme sua nova senha" required>
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-exclamation-circle"></i>
                                <small>Mensagem de erro</small>
                            </div>
                            
                            <button type="submit">Redefinir Senha</button>
                        </form>
                    </div>
                </div>
            </body>
            </html>
            <?php
        } else {
            die('Token inválido ou expirado.');
        }
    } catch(PDOException $e) {
        die('Erro no servidor.');
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Processar redefinição de senha
    $token = filter_input(INPUT_POST, 'token', FILTER_SANITIZE_STRING);
    $newPassword = $_POST['new_password'];
    $confirmPassword = $_POST['confirm_password'];
    
    if (empty($token) || empty($newPassword) || empty($confirmPassword)) {
        die('Todos os campos são obrigatórios.');
    }
    
    if ($newPassword !== $confirmPassword) {
        die('As senhas não coincidem.');
    }
    
    try {
        $conn = getDBConnection();
        
        // Verificar token válido
        $stmt = $conn->prepare("SELECT prt.*, u.id as user_id 
                               FROM password_reset_tokens prt 
                               JOIN usuarios u ON prt.usuario_id = u.id 
                               WHERE prt.token = :token AND prt.used = 0 AND prt.expiry_date > NOW()");
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        
        if ($stmt->rowCount() === 1) {
            $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Atualizar senha do usuário
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("UPDATE usuarios SET senha = :senha WHERE id = :id");
            $stmt->bindParam(':senha', $hashedPassword);
            $stmt->bindParam(':id', $tokenData['user_id']);
            $stmt->execute();
            
            // Marcar token como usado
            $stmt = $conn->prepare("UPDATE password_reset_tokens SET used = 1 WHERE token = :token");
            $stmt->bindParam(':token', $token);
            $stmt->execute();
            
            echo "Senha redefinida com sucesso! <a href='index.html'>Faça login</a>";
        } else {
            die('Token inválido ou expirado.');
        }
    } catch(PDOException $e) {
        die('Erro no servidor.');
    }
}
?>