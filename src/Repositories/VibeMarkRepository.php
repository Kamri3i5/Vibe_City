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

    $id = (int) $this->pdo->lastInsertId();

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

  public function update(int $id, string $vibe): ?array
  {
    $stmt = $this->pdo->prepare(
      'UPDATE vibe_marks
       SET vibe = :vibe, created_at = CURRENT_TIMESTAMP
       WHERE id = :id'
    );

    $stmt->execute([
      'id' => $id,
      'vibe' => $vibe,
    ]);

    return $this->findById($id);
  }


  public function findByPlaceId(int $placeId): array
  {
    $stmt = $this->pdo->prepare(
      'SELECT id, place_id, session_id, vibe, created_at
      FROM vibe_marks
      WHERE place_id= :place_id
      ORDER BY created_at DESC'
    );

    $stmt->execute([
      'place_id' => $placeId,
    ]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
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
  public function findLatestFeed(int $limit = 15): array
  {
    $stmt = $this->pdo->prepare(
      'SELECT
      vm.id,
      vm.place_id,
      p.title AS place_title,
      vm.vibe,
      vm.created_at
     FROM vibe_marks vm
     JOIN places p ON p.id = vm.place_id
     ORDER BY vm.created_at DESC
     LIMIT 15'
    );

    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

}
