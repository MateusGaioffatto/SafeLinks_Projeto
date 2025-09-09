<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Usuário não logado']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $usuario_id = $_SESSION['usuario_id'];
    $produto_nome = $input['produto'];
    $loja_nome = $input['loja'];
    $produto_url = $input['url'];
    
    try {
        $conn = getDBConnection();
        
        // Verificar se já é favorito
        $stmt = $conn->prepare("SELECT id FROM favoritos WHERE usuario_id = :usuario_id AND produto_url = :produto_url");
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->bindParam(':produto_url', $produto_url);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'message' => 'Este produto já está nos favoritos']);
            exit();
        }
        
        // Adicionar favorito
        $stmt = $conn->prepare("INSERT INTO favoritos (usuario_id, produto_nome, produto_url, loja_nome) VALUES (:usuario_id, :produto_nome, :produto_url, :loja_nome)");
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->bindParam(':produto_nome', $produto_nome);
        $stmt->bindParam(':produto_url', $produto_url);
        $stmt->bindParam(':loja_nome', $loja_nome);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Favorito adicionado com sucesso']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao adicionar favorito']);
        }
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
}
?>