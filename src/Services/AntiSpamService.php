<?php

class AntiSpamService
{
  private VibeMarkRepository $vibeMarkRepository;
  private int $cooldownSeconds = 300;

  public function __construct(VibeMarkRepository $vibeMarkRepository)
  {
    $this->vibeMarkRepository = $vibeMarkRepository;
  }

  public function findActiveVote(int $placeId, int $sessionId): ?array
  {
    $latestVote = $this->vibeMarkRepository->findLatestForPlaceAndSession($placeId, $sessionId);

    if (!$latestVote) {
      return null;
    }

    $lastVoteTime = strtotime($latestVote['created_at']);

    if ($lastVoteTime === false) {
      return null;
    }

    if ((time() - $lastVoteTime) < $this->cooldownSeconds) {
      return $latestVote;
    }

    return null;
  }

  public function canVote(int $placeId, int $sessionId): bool
  {
    return $this->findActiveVote($placeId, $sessionId) === null;
  }
}
