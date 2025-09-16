<?php
// Configurações do banco de dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'sistema_login');
define('DB_USER', 'root');
define('DB_PASS', '');



// Conexão com o banco de dados
function getDBConnection() {
    try {
        $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        die("Erro na conexão: " . $e->getMessage());
    }
}

// Adicione isto no config.php
function createUserTables($conn) {
    // Tabela de usuários (já existe)
    $sqlUsers = "CREATE TABLE IF NOT EXISTS usuarios (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )";

    // Tabela com estrutura completa
    $sqlNewHistory = "CREATE TABLE IF NOT EXISTS historico_pesquisas (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT(11) NOT NULL,
        termo_pesquisa VARCHAR(255) NOT NULL,
        produto_nome VARCHAR(255) NOT NULL,
        produto_url TEXT NOT NULL,
        loja_nome VARCHAR(100) NOT NULL,
        preco VARCHAR(255) NULL,
        imagem TEXT NULL,
        data_pesquisa DATETIME DEFAULT CURRENT_TIMESTAMP,
        url_segura TINYINT(1) DEFAULT 1,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )";
    
    // Tabela de produtos favoritos
    $sqlProdutosFavoritos = "CREATE TABLE IF NOT EXISTS favoritos (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT(11) NOT NULL,
        produto_nome VARCHAR(255) NOT NULL,
        produto_url TEXT NOT NULL,
        loja_nome VARCHAR(100) NOT NULL,
        preco VARCHAR(255) NULL,
        imagem TEXT NULL,
        url_segura TINYINT(1) DEFAULT 1,
        data_adicao DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_usuario_produto (usuario_id, produto_url(200)),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )";
    
    $conn->exec($sqlUsers);
    $conn->exec($sqlNewHistory);
    $conn->exec($sqlProdutosFavoritos);
    
    // Verificar e adicionar colunas se não existirem
    try {
        // Verificar se a coluna 'preco' existe
        $stmt = $conn->query("SHOW COLUMNS FROM favoritos LIKE 'preco'");
        $precoExists = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$precoExists) {
            $conn->exec("ALTER TABLE favoritos ADD COLUMN preco VARCHAR(255) NULL AFTER loja_nome");
        }
        
        // Verificar se a coluna 'imagem' existe
        $stmt = $conn->query("SHOW COLUMNS FROM favoritos LIKE 'imagem'");
        $imagemExists = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$imagemExists) {
            $conn->exec("ALTER TABLE favoritos ADD COLUMN imagem TEXT NULL AFTER preco");
        }
        
        // Verificar se a coluna 'url_segura' existe em favoritos
        $stmt = $conn->query("SHOW COLUMNS FROM favoritos LIKE 'url_segura'");
        $urlSeguraExists = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$urlSeguraExists) {
            $conn->exec("ALTER TABLE favoritos ADD COLUMN url_segura TINYINT(1) DEFAULT 1 AFTER imagem");
        }
        
        // Verificar se a coluna 'url_segura' existe em historico_pesquisas
        $stmt = $conn->query("SHOW COLUMNS FROM historico_pesquisas LIKE 'url_segura'");
        $urlSeguraExists = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$urlSeguraExists) {
            $conn->exec("ALTER TABLE historico_pesquisas ADD COLUMN url_segura TINYINT(1) DEFAULT 1 AFTER imagem");
        }
    } catch (PDOException $e) {
        // Ignorar erros se as tabelas não existirem ainda
        if (strpos($e->getMessage(), "doesn't exist") === false) {
            error_log("Erro ao verificar/atualizar tabelas: " . $e->getMessage());
        }
    }
}

// Inicializar o banco de dados
try {
    $conn = getDBConnection();
    createUserTables($conn);    
} catch(PDOException $e) {
    die("Erro ao inicializar o banco de dados: " . $e->getMessage());
}
?>