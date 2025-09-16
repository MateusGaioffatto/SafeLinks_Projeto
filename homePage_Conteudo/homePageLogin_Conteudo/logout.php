<?php
session_start();

// Destruir todas as variáveis de sessão
$_SESSION = array();

// Destruir a sessão
session_destroy();

// Redirecionar para a página de login
header('Location: index.html?message=' . urlencode('Você saiu do sistema.') . '&type=success');
exit();
?>