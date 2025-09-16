<?php
session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: index.html?message=' . urlencode('Acesso restrito! Faça login.') . '&type=error');
    exit();
}

require_once 'config.php';
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(120deg, #3498db, #8e44ad);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .dashboard {
            background-color: #fff;
            border-radius: 15px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            width: 400px;
            max-width: 100%;
            padding: 30px;
            text-align: center;
        }
        
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        
        p {
            color: #666;
            margin-bottom: 20px;
        }
        
        .user-info {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .btn {
            display: inline-block;
            background: linear-gradient(120deg, #3498db, #8e44ad);
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            transition: opacity 0.3s ease;
        }
        
        .btn:hover {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <h1>Bem-vindo ao Dashboard!</h1>
        
        <div class="user-info">
            <p>Você está logado como:</p>
            <p><strong>Nome:</strong> <?php echo htmlspecialchars($_SESSION['usuario_nome']); ?></p>
            <p><strong>E-mail:</strong> <?php echo htmlspecialchars($_SESSION['usuario_email']); ?></p>
        </div>
        
        <a href="logout.php" class="btn">Sair</a>
    </div>
</body>
</html>