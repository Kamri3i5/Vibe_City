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

    $sessionToken = trim((string)$data['session_token']);
    $vibe = trim((string)$data['vibe']);

    $session = $this->sessionRepository->findOrCreateByToken($sessionToken);

    if (!$this->antiSpamService->canVote($id, (int)$session['id'])) {
      http_response_code(429);
      echo json_encode([
        'error' => 'You can vote for this place once every 5 minutes',
      ]);
      return;
    }

    $vibeMark = $this->vibeMarkRepository->create([
      'place_id' => $id,
      'session_id' => (int)$session['id'],
      'vibe' => $vibe,
    ]);

    http_response_code(201);
    echo json_encode($vibeMark);
  }
}
