<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    
    // Validação
    if (empty($email)) {
        header('Location: index.html?message=' . urlencode('E-mail é obrigatório!') . '&type=error');
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
            
            // Simular envio de e-mail (em produção, enviaria um e-mail real)
            // Aqui seria o código para enviar um e-mail com link para redefinir senha
            
            header('Location: index.html?message=' . urlencode('Instruções para redefinir sua senha foram enviadas para seu e-mail.') . '&type=success');
            exit();
        } else {
            header('Location: index.html?message=' . urlencode('E-mail não encontrado!') . '&type=error');
            exit();
        }
    } catch(PDOException $e) {
        header('Location: index.html?message=' . urlencode('Erro no servidor: ' . $e->getMessage()) . '&type=error');
        exit();
    }
} else {
    header('Location: index.html');
    exit();
}
?>