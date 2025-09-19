<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Usuário não logado']);
    exit();
}

$usuario_id = $_SESSION['usuario_id'];

try {
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("SELECT produto_nome, produto_url, loja_nome, data_adicao FROM favoritos WHERE usuario_id = :usuario_id ORDER BY data_adicao DESC");
    $stmt->bindParam(':usuario_id', $usuario_id);
    $stmt->execute();
    
    $favoritos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'favorites' => $favoritos]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>