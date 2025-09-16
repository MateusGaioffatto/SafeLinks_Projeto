<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

$searchQuery = $_GET['q'] ?? '';

if (empty($searchQuery)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing search query']);
    exit();
}

$apiKey = "62d588a730582c874433f445ab8a2421e43eff119be98934a9e628945c4401cd";
$url = "https://serpapi.com/search.json?engine=google_shopping&q=" . urlencode($searchQuery) . "&gl=br&api_key=" . $apiKey;

// Usar cURL para melhor controle de erros
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FAILONERROR, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);

if (curl_error($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch data: ' . curl_error($ch)]);
    curl_close($ch);
    exit();
}

curl_close($ch);

echo $response;
?>