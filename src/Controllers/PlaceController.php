<?php
class PlaceController
{
  private PlaceRepository $repository;

  public function __construct()
  {
    $this->repository = new PlaceRepository();
  }

  public function index(): void
  {
    $places = $this->repository->getAll();
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($places);
  }

  public function show(int $id): void
  {
    $place = $this->repository->findById($id);

    header('Content-Type: application/json');

    if (!$place) {
      http_response_code(404);
      echo json_encode(['error' => 'Place not found']);
      return;
    }

    http_response_code(200);
    echo json_encode($place);
  }

  public function store(): void
  {
    header('Content-Type: application/json');

    $rawBody = file_get_contents('php://input');
    $data = json_decode($rawBody, true);

    if (!is_array($data)) {
      http_response_code(400);
      echo json_encode(['error' => 'Invalid JSON body']);
      return;
    }

    $title = trim((string)($data['title'] ?? ''));
    $lat = $data['lat'] ?? null;
    $lng = $data['lng'] ?? null;
    $category = trim((string)($data['category'] ?? ''));
    $address = isset($data['address']) ? trim((string)$data['address']) : null;
    $image = isset($data['image']) ? trim((string)$data['image']) : null;

    if ($title === '') {
      http_response_code(400);
      echo json_encode(['error' => 'Title is required']);
      return;
    }

    if (!is_numeric($lat) || (float)$lat < -90 || (float)$lat > 90) {
      http_response_code(400);
      echo json_encode(['error' => 'Lat must be between -90 and 90']);
      return;
    }

    if (!is_numeric($lng) || (float)$lng < -180 || (float)$lng > 180) {
      http_response_code(400);
      echo json_encode(['error' => 'Lng must be between -180 and 180']);
      return;
    }

    if ($category === '') {
      http_response_code(400);
      echo json_encode(['error' => 'Category is required']);
      return;
    }

    $place = $this->repository->create([
      'title' => $title,
      'lat' => (float)$lat,
      'lng' => (float)$lng,
      'category' => $category,
      'address' => $address !== '' ? $address : null,
      'image' => $image !== '' ? $image : null,
    ]);

    http_response_code(201);
    echo json_encode($place);
  }
  public function hotPlaces(): void
  {
    header('Content-Type: application/json');

    $places = $this->repository->findHotPlaces();

    http_response_code(200);

    echo json_encode($places);
  }
}
