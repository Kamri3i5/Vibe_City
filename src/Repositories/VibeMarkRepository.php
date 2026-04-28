<?php

class VibeMarkRepository
{
  private PDO $pdo;

  public function __construct()
  {
    $this->pdo = Database::getConnection();
  }

  public function create(array $data): array
  {
    $stmt = $this->pdo->prepare(
      'INSERT INTO vibe_marks (place_id, session_id, vibe) VALUES (:place_id, :session_id, :vibe)'
    );

    $stmt->execute([
      'place_id' => $data['place_id'],
      'session_id' => $data['session_id'],
      'vibe' => $data['vibe'],
    ]);

    $id = (int)$this->pdo->lastInsertId();

    return $this->findById($id);
  }

  public function findById(int $id): ?array
  {
    $stmt = $this->pdo->prepare(
      'SELECT id, place_id, session_id, vibe, created_at FROM vibe_marks WHERE id = :id'
    );

    $stmt->execute(['id' => $id]);

    $vibeMark = $stmt->fetch(PDO::FETCH_ASSOC);

    return $vibeMark ?: null;
  }

  public function findLatestForPlaceAndSession(int $placeId, int $sessionId): ?array
  {
    $stmt = $this->pdo->prepare(
      'SELECT id, place_id, session_id, vibe, created_at
       FROM vibe_marks
       WHERE place_id = :place_id AND session_id = :session_id
       ORDER BY created_at DESC
       LIMIT 1'
    );

    $stmt->execute([
      'place_id' => $placeId,
      'session_id' => $sessionId,
    ]);

    $vibeMark = $stmt->fetch(PDO::FETCH_ASSOC);

    return $vibeMark ?: null;
  }
}
