<?php

class SessionRepository
{
  private PDO $pdo;

  public function __construct()
  {
    $this->pdo = Database::getConnection();
  }

  public function findByToken(string $token): ?array
  {
    $stmt = $this->pdo->prepare(
      'SELECT id, session_token, created_at FROM sessions WHERE session_token = :session_token'
    );

    $stmt->execute(['session_token' => $token]);

    $session = $stmt->fetch(PDO::FETCH_ASSOC);

    return $session ?: null;
  }

  public function create(string $token): array
  {
    $stmt = $this->pdo->prepare(
      'INSERT INTO sessions (session_token) VALUES (:session_token)'
    );

    $stmt->execute(['session_token' => $token]);

    return $this->findByToken($token);
  }

  public function findOrCreateByToken(string $token): array
  {
    $session = $this->findByToken($token);

    if ($session) {
      return $session;
    }

    return $this->create($token);
  }
}
