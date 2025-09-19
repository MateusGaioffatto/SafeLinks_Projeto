<?php
require_once 'config.php';
require_once 'send_email.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    
    // Validação
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Location: index.html?message=' . urlencode('E-mail é obrigatório e deve ser válido!') . '&type=error');
        exit();
    }
    
    try {
        $conn = getDBConnection();
        
        // Verificar se o e-mail existe
        $stmt = $conn->prepare("SELECT id, nome FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        if ($stmt->rowCount() == 1) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Gerar token único para redefinição
            $resetToken = bin2hex(random_bytes(32));
            $expiryDate = date('Y-m-d H:i:s', strtotime('+1 hour'));
            
            // Criar tabela de tokens se não existir
            $conn->exec("CREATE TABLE IF NOT EXISTS password_reset_tokens (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT(11) NOT NULL,
                token VARCHAR(64) NOT NULL UNIQUE,
                expiry_date DATETIME NOT NULL,
                used TINYINT(1) DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )");
            
            // Inserir token no banco de dados
            $stmt = $conn->prepare("INSERT INTO password_reset_tokens (usuario_id, token, expiry_date) 
                                   VALUES (:usuario_id, :token, :expiry_date)");
            $stmt->bindParam(':usuario_id', $usuario['id']);
            $stmt->bindParam(':token', $resetToken);
            $stmt->bindParam(':expiry_date', $expiryDate);
            $stmt->execute();
            
            // Enviar email usando Resend
            $emailSent = sendPasswordResetEmail($email, $usuario['nome'], $resetToken);
            
            if ($emailSent) {
                header('Location: login.html?message=' . urlencode('Instruções para redefinir sua senha foram enviadas para seu e-mail.') . '&type=success');
            } else {
                header('Location: login.html?message=' . urlencode('Erro ao enviar email. Tente novamente mais tarde.') . '&type=error');
            }
            exit();
        } else {
            // Para segurança, não revelar se o email existe ou não
            header('Location: login.html?message=' . urlencode('Se o email existir em nosso sistema, você receberá instruções de recuperação.') . '&type=success');
            exit();
        }
    } catch(PDOException $e) {
        error_log("Erro no recover.php: " . $e->getMessage());
        header('Location: login.html?message=' . urlencode('Erro no servidor. Tente novamente mais tarde.') . '&type=error');
        exit();
    }
} else {
    header('Location: ../index.html');
    exit();
}
?>