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
    // Buscar produtos favoritos
    try {
        $stmt = $conn->prepare("SELECT id, usuario_id, produto_nome, produto_url, loja_nome, preco, imagem, data_adicao 
                               FROM favoritos 
                               WHERE usuario_id = ? 
                               ORDER BY data_adicao DESC");
        $stmt->execute([$usuario_id]);
        $favoritos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($favoritos);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao buscar favoritos: ' . $e->getMessage()]);
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Adicionar/remover favorito
    $dados = json_decode(file_get_contents('php://input'), true);
    
    $produto_nome = $dados['produto_nome'] ?? '';
    $produto_url = $dados['produto_url'] ?? '';
    $loja_nome = $dados['loja_nome'] ?? '';
    $preco = $dados['preco'] ?? '';
    $imagem = $dados['imagem'] ?? '';
    $acao = $dados['acao'] ?? '';
    
    // Permitir remoção apenas com a URL (para compatibilidade com a página de favoritos)
    if (($acao === 'remover' && !empty($produto_url)) || 
        ($acao === 'adicionar' && !empty($produto_nome) && !empty($produto_url))) {
        
        try {
            if ($acao === 'adicionar') {
                // Verificar se já existe para evitar duplicatas
                $stmt = $conn->prepare("SELECT id FROM favoritos 
                                       WHERE usuario_id = ? AND produto_url = ?");
                $stmt->execute([$usuario_id, $produto_url]);
                
                if ($stmt->rowCount() === 0) {
                    $stmt = $conn->prepare("INSERT INTO favoritos 
                                          (usuario_id, produto_nome, produto_url, loja_nome, preco, imagem, data_adicao) 
                                          VALUES (?, ?, ?, ?, ?, ?, NOW())");
                    $stmt->execute([$usuario_id, $produto_nome, $produto_url, $loja_nome, $preco, $imagem]);
                    echo json_encode(['success' => true, 'message' => 'Produto adicionado aos favoritos']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Produto já está nos favoritos']);
                }
            } elseif ($acao === 'remover') {
                $stmt = $conn->prepare("DELETE FROM favoritos 
                                       WHERE usuario_id = ? AND produto_url = ?");
                $stmt->execute([$usuario_id, $produto_url]);
                
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['success' => true, 'message' => 'Produto removido dos favoritos']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Produto não encontrado nos favoritos']);
                }
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao atualizar favoritos: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Dados inválidos']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}
?>