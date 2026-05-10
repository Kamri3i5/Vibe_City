<?php
class Router 
{
  private array $routes = [];

  public function get(string $path, array $handler): void 
  {
    $this->routes[] = ['GET', $path, $handler];
  }

  public function post(string $path, array $handler): void
  {
    $this->routes[] = ['POST', $path, $handler];
  }

  public function dispatch(string $method, string $uri): void
  {
    $path = parse_url($uri, PHP_URL_PATH) ?? '/';

    foreach ($this->routes as $route) {
      if ($route[0] !== $method) {
        continue;
      }

      $pattern = preg_replace('#\{[a-zA-Z_]+\}#', '([0-9]+)', $route[1]);
      $pattern = '#^' . $pattern . '$#';

      if (!preg_match($pattern, $path, $matches)) {
        continue;
      }

      array_shift($matches);

      $controllerClass = $route[2][0];
      $methodName = $route[2][1];

      $controller = new $controllerClass();
      $controller->$methodName(...$matches);
      return;
    }

    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Route not found']);
  }
}
