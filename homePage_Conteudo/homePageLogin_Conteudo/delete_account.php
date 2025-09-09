<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Usuário não logado']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_SESSION['usuario_id'];
    
    try {
        $conn = getDBConnection();
        
        // Excluir usuário (as tabelas de favoritos e histórico serão excluídas em cascata devido à FOREIGN KEY)
        $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = :id");
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            // Encerrar a sessão
            session_unset();
            session_destroy();
            
            echo json_encode(['success' => true, 'message' => 'Conta excluída com sucesso']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao excluir conta']);
        }
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
}
?>
