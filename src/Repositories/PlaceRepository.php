<?php

class PlaceRepository
{
  private PDO $pdo;

  public function __construct()
  {
    $this->pdo = Database::getConnection();
  }

  public function getAll(): array
  {
    $stmt = $this->pdo->query("
      SELECT
        p.id,
        p.title,
        p.lat,
        p.lng,
        p.address,
        p.category,
        p.image,
        p.created_at,
        COALESCE(SUM(CASE WHEN vm.vibe = 'fire' THEN 1 ELSE 0 END), 0) AS fire,
        COALESCE(SUM(CASE WHEN vm.vibe = 'neutral' THEN 1 ELSE 0 END), 0) AS neutral,
        COALESCE(SUM(CASE WHEN vm.vibe = 'dead' THEN 1 ELSE 0 END), 0) AS dead,
        COALESCE(MAX(vm.created_at), p.created_at) AS last_activity_at
      FROM places p
      LEFT JOIN vibe_marks vm ON vm.place_id = p.id
      GROUP BY p.id, p.title, p.lat, p.lng, p.address, p.category, p.image, p.created_at
      ORDER BY p.created_at DESC
    ");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function findById(int $id): ?array
  {
    $stmt = $this->pdo->prepare("
      SELECT
        p.id,
        p.title,
        p.lat,
        p.lng,
        p.address,
        p.category,
        p.image,
        p.created_at,
        COALESCE(SUM(CASE WHEN vm.vibe = 'fire' THEN 1 ELSE 0 END), 0) AS fire,
        COALESCE(SUM(CASE WHEN vm.vibe = 'neutral' THEN 1 ELSE 0 END), 0) AS neutral,
        COALESCE(SUM(CASE WHEN vm.vibe = 'dead' THEN 1 ELSE 0 END), 0) AS dead,
        COALESCE(MAX(vm.created_at), p.created_at) AS last_activity_at
      FROM places p
      LEFT JOIN vibe_marks vm ON vm.place_id = p.id
      WHERE p.id = :id
      GROUP BY p.id, p.title, p.lat, p.lng, p.address, p.category, p.image, p.created_at
    ");
    $stmt->execute(['id' => $id]);

    $place = $stmt->fetch(PDO::FETCH_ASSOC);

    return $place ?: null;
  }

  public function create(array $data): array
  {
    $stmt = $this->pdo->prepare(
      'INSERT INTO places (title, lat, lng, address, category, image)
       VALUES (:title, :lat, :lng, :address, :category, :image)'
    );

    $stmt->execute([
      'title' => $data['title'],
      'lat' => $data['lat'],
      'lng' => $data['lng'],
      'address' => $data['address'],
      'category' => $data['category'],
      'image' => $data['image'],
    ]);

    $id = (int) $this->pdo->lastInsertId();

    return $this->findById($id);
  }
  public function findHotPlaces(int $limit = 10): array
  {
    $stmt = $this->pdo->prepare(
      'SELECT
      p.id,
      p.title,
      p.lat,
      p.lng,
      p.address,
      p.category,
      p.image,
      p.created_at,
      COUNT(vm.id) AS vibes_count,
      COALESCE(SUM(CASE WHEN vm.vibe = "fire" THEN 1 ELSE 0 END), 0) AS fire,
      COALESCE(SUM(CASE WHEN vm.vibe = "neutral" THEN 1 ELSE 0 END), 0) AS neutral,
      COALESCE(SUM(CASE WHEN vm.vibe = "dead" THEN 1 ELSE 0 END), 0) AS dead
     FROM places p
     LEFT JOIN vibe_marks vm ON vm.place_id = p.id
     GROUP BY p.id, p.title, p.lat, p.lng, p.address, p.category, p.image, p.created_at
     ORDER BY vibes_count DESC
     LIMIT 10'
    );

    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

}
