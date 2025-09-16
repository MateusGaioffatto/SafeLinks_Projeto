<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $senha = $_POST['password'];
    
    // Validações
    if (empty($email) || empty($senha)) {
        header('Location: index.html?message=' . urlencode('E-mail e senha são obrigatórios!') . '&type=error');
        exit();
    }
    
    try {
        $conn = getDBConnection();
        
        // Buscar usuário
        $stmt = $conn->prepare("SELECT id, nome, email, senha FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        if ($stmt->rowCount() == 1) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Verificar senha
            if (password_verify($senha, $usuario['senha'])) {
                // Login bem-sucedido
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['usuario_nome'] = $usuario['nome'];
                $_SESSION['usuario_email'] = $usuario['email'];
                $_SESSION['logado'] = true;
                
                header('Location: index.php');
                exit();
            } else {
                header('Location: index.html?message=' . urlencode('Senha incorreta!') . '&type=error');
                exit();
            }
        } else {
            header('Location: index.html?message=' . urlencode('Usuário não encontrado!') . '&type=error');
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