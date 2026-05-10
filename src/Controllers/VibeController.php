<?php

class VibeController
{
  private PlaceRepository $placeRepository;
  private SessionRepository $sessionRepository;
  private VibeMarkRepository $vibeMarkRepository;
  private ValidationService $validationService;
  private AntiSpamService $antiSpamService;

  public function __construct()
  {
    $this->placeRepository = new PlaceRepository();
    $this->sessionRepository = new SessionRepository();
    $this->vibeMarkRepository = new VibeMarkRepository();
    $this->validationService = new ValidationService();
    $this->antiSpamService = new AntiSpamService($this->vibeMarkRepository);
  }

  public function store(int $id): void
  {
    header('Content-Type: application/json');

    $place = $this->placeRepository->findById($id);

    if (!$place) {
      http_response_code(404);
      echo json_encode(['error' => 'Place not found']);
      return;
    }

    $rawBody = file_get_contents('php://input');
    $data = json_decode($rawBody, true);

    if (!is_array($data)) {
      http_response_code(400);
      echo json_encode(['error' => 'Invalid JSON body']);
      return;
    }

    $errors = $this->validationService->validateVibePayload($data);

    if ($errors !== []) {
      http_response_code(400);
      echo json_encode(['errors' => $errors]);
      return;
    }

    $sessionToken = trim((string) $data['session_token']);
    $vibe = trim((string) $data['vibe']);

    $session = $this->sessionRepository->findOrCreateByToken($sessionToken);
    $activeVote = $this->antiSpamService->findActiveVote($id, (int) $session['id']);

    if ($activeVote) {
      if ($activeVote['vibe'] === $vibe) {
        http_response_code(200);
        echo json_encode($activeVote);
        return;
      }

      $updatedVibeMark = $this->vibeMarkRepository->update((int) $activeVote['id'], $vibe);

      http_response_code(200);
      echo json_encode($updatedVibeMark);
      return;
    }

    $vibeMark = $this->vibeMarkRepository->create([
      'place_id' => $id,
      'session_id' => (int) $session['id'],
      'vibe' => $vibe,
    ]);

    http_response_code(201);
    echo json_encode($vibeMark);
  }

  public function indexByPlace(int $placeId): void
  {
    $place = $this->placeRepository->findById($placeId);

    header('Content-Type: application/json');

    if (!$place) {
      http_response_code(404);
      echo json_encode(['error' => 'Place not found']);
      return;
    }
    $vibes = $this->vibeMarkRepository->findByPlaceId($placeId);
    http_response_code(200);
    echo json_encode($vibes);

  }
  public function activityFeed(): void
  {
    header('Content-Type: application/json');

    $feed = $this->vibeMarkRepository->findLatestFeed();

    http_response_code(200);
    echo json_encode($feed);
  }
}
