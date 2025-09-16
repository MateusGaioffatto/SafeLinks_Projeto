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

// Criar tabela de usuários se não existir
function createUsersTable($conn) {
    $sql = "CREATE TABLE IF NOT EXISTS usuarios (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )";
    
    $conn->exec($sql);
}

// Inicializar o banco de dados
try {
    $conn = getDBConnection();
    createUsersTable($conn);
} catch(PDOException $e) {
    die("Erro ao inicializar o banco de dados: " . $e->getMessage());
}
?>