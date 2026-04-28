<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
  http_response_code(204);
  exit;
}

require_once __DIR__ . '/../src/Core/Router.php';
require_once __DIR__ . '/../src/Core/Database.php';
require_once __DIR__ . '/../src/Repositories/PlaceRepository.php';
require_once __DIR__ . '/../src/Repositories/SessionRepository.php';
require_once __DIR__ . '/../src/Repositories/VibeMarkRepository.php';
require_once __DIR__ . '/../src/Services/ValidationService.php';
require_once __DIR__ . '/../src/Services/AntiSpamService.php';
require_once __DIR__ . '/../src/Controllers/PlaceController.php';
require_once __DIR__ . '/../src/Controllers/VibeController.php';

$router = new Router();

$router->get('/places', [PlaceController::class, 'index']);
$router->post('/places', [PlaceController::class, 'store']);
$router->get('/places/{id}', [PlaceController::class, 'show']);
$router->post('/places/{id}/vibes', [VibeController::class, 'store']);


$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = $_SERVER['REQUEST_URI'] ?? '/';

$router->dispatch($method, $uri);
