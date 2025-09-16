<?php
header('Content-Type: application/json');

function normalizarUrl($url) {
    // Remover espaços em branco
    $url = trim($url);
    
    // Adicionar http:// se não tiver protocolo
    if (!preg_match('/^https?:\/\//i', $url)) {
        $url = 'http://' . $url;
    }
    
    // Validar e sanitizar URL
    $url = filter_var($url, FILTER_SANITIZE_URL);
    
    return $url;
}

function verificarUrlSegura($url) {
    $url = normalizarUrl($url);
    
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        return [
            'segura' => false,
            'erro' => 'URL inválida',
            'url' => $url
        ];
    }
    
    // API key diretamente no código (como solicitado)
    $apiKey = 'AIzaSyBqsbb3claaGJ-4XZ-FugWHLtl5uxHDdNo';
    $apiUrl = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" . $apiKey;
    
    $postData = [
        "client" => [
            "clientId" => "safelinks",
            "clientVersion" => "1.0.0"
        ],
        "threatInfo" => [
            "threatTypes" => [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION"
            ],
            "platformTypes" => ["ANY_PLATFORM"],
            "threatEntryTypes" => ["URL"],
            "threatEntries" => [
                ["url" => $url]
            ]
        ]
    ];
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($postData),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json'
        ],
        CURLOPT_TIMEOUT => 15,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_FAILONERROR => true
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    if ($response === false) {
        return [
            'segura' => true, // Assume segura em caso de erro
            'erro' => 'Erro na comunicação com a API: ' . $curlError,
            'codigo_http' => $httpCode
        ];
    }
    
    if ($httpCode !== 200) {
        return [
            'segura' => true, // Assume segura em caso de erro
            'erro' => 'Erro na API: HTTP ' . $httpCode,
            'resposta' => $response
        ];
    }
    
    $data = json_decode($response, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        return [
            'segura' => true,
            'erro' => 'Resposta da API inválida',
            'resposta' => $response
        ];
    }
    
    if (empty($data['matches'])) {
        return [
            'segura' => true,
            'url' => $url
        ];
    }
    
    $threats = [];
    foreach ($data['matches'] as $match) {
        $threats[] = [
            'tipo' => $match['threatType'],
            'plataforma' => $match['platformType'],
            'ameaca' => $match['threat']['url']
        ];
    }
    
    return [
        'segura' => false,
        'ameacas' => $threats,
        'url' => $url
    ];
}

// Processar requisição
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('JSON inválido');
        }
        
        if (!isset($input['url']) || empty(trim($input['url']))) {
            throw new Exception('URL não fornecida');
        }
        
        $url = $input['url'];
        $resultado = verificarUrlSegura($url);
        echo json_encode($resultado);
        
    } catch (Exception $e) {
        echo json_encode([
            'segura' => false,
            'erro' => $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'segura' => false,
        'erro' => 'Método não permitido. Use POST.'
    ]);
}
?>