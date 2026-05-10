<?php

class ValidationService
{
  private array $allowedVibes = ['fire', 'neutral', 'dead'];

  public function validateVibePayload(array $data): array
  {
    $errors = [];

    $sessionToken = trim((string)($data['session_token'] ?? ''));
    $vibe = trim((string)($data['vibe'] ?? ''));

    if ($sessionToken === '') {
      $errors[] = 'Session token is required';
    } elseif (mb_strlen($sessionToken) > 64) {
      $errors[] = 'Session token must be at most 64 characters';
    }

    if ($vibe === '') {
      $errors[] = 'Vibe is required';
    } elseif (!in_array($vibe, $this->allowedVibes, true)) {
      $errors[] = 'Vibe must be one of: fire, neutral, dead';
    }

    return $errors;
  }
}
