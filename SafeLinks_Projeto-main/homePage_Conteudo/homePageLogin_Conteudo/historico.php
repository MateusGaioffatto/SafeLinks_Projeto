<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Não autorizado']);
    exit();
}

header('Content-Type: application/json');

$usuario_id = $_SESSION['usuario_id'];
$conn = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Buscar histórico do usuário
    try {
        $stmt = $conn->prepare("SELECT termo_pesquisa, produto_nome, produto_url, loja_nome, preco, imagem, data_pesquisa 
                               FROM historico_pesquisas 
                               WHERE usuario_id = ? 
                               ORDER BY data_pesquisa DESC 
                               LIMIT 10");
        $stmt->execute([$usuario_id]);
        $historico = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($historico);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao buscar histórico']);
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Adicionar ao histórico
    $dados = json_decode(file_get_contents('php://input'), true);
    $termo = $dados['termo'] ?? '';
    $produto_nome = $dados['produto_nome'] ?? '';
    $produto_url = $dados['produto_url'] ?? '';
    $loja_nome = $dados['loja_nome'] ?? '';
    $preco = $dados['preco'] ?? '';
    $imagem = $dados['imagem'] ?? '';
    
    if (!empty($termo)) {
        try {
            $stmt = $conn->prepare("INSERT INTO historico_pesquisas 
                                   (usuario_id, termo_pesquisa, produto_nome, produto_url, loja_nome, preco, imagem) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$usuario_id, $termo, $produto_nome, $produto_url, $loja_nome, $preco, $imagem]);
            echo json_encode(['success' => true]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao salvar histórico']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Termo de pesquisa vazio']);
    }
}
?>