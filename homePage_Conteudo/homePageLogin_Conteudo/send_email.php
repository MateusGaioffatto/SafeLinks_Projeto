<?php
require_once 'config.php';

function sendPasswordResetEmail($toEmail, $toName, $resetToken) {
    $resetLink = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . "/reset_password.php?token=" . $resetToken;
    
    $subject = "Recuperação de Senha - SafeLinks";
    
    $htmlContent = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Recuperação de Senha</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .button { background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>SafeLinks</h1>
            </div>
            <div class='content'>
                <h2>Recuperação de Senha</h2>
                <p>Olá, $toName!</p>
                <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha:</p>
                <p style='text-align: center; margin: 30px 0;'>
                    <a href='$resetLink' class='button'>Redefinir Senha</a>
                </p>
                <p>Se você não solicitou a redefinição de senha, ignore este email.</p>
                <p><strong>Este link expira em 1 hora.</strong></p>
            </div>
            <div class='footer'>
                <p>© " . date('Y') . " SafeLinks. Todos os direitos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $textContent = "Olá $toName!\n\n";
    $textContent .= "Recebemos uma solicitação para redefinir sua senha.\n";
    $textContent .= "Acesse este link para redefinir sua senha: $resetLink\n\n";
    $textContent .= "Se você não solicitou a redefinição de senha, ignore este email.\n";
    $textContent .= "Este link expira em 1 hora.\n\n";
    $textContent .= "Atenciosamente,\nEquipe SafeLinks";
    
    // Dados para a API Resend
    $data = [
        'from' => RESEND_FROM_NAME . ' <' . RESEND_FROM_EMAIL . '>',
        'to' => [$toEmail],
        'subject' => $subject,
        'html' => $htmlContent,
        'text' => $textContent
    ];
    
    // Configurar a requisição cURL
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . RESEND_API_KEY
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        return true;
    } else {
        error_log("Erro ao enviar email via Resend: " . $response);
        return false;
    }
}
?>