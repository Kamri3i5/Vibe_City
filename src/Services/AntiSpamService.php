<?php

class AntiSpamService
{
  private VibeMarkRepository $vibeMarkRepository;
  private int $cooldownSeconds = 300;

  public function __construct(VibeMarkRepository $vibeMarkRepository)
  {
    $this->vibeMarkRepository = $vibeMarkRepository;
  }

  public function canVote(int $placeId, int $sessionId): bool
  {
    $latestVote = $this->vibeMarkRepository->findLatestForPlaceAndSession($placeId, $sessionId);

    if (!$latestVote) {
      return true;
    }

    $lastVoteTime = strtotime($latestVote['created_at']);

    if ($lastVoteTime === false) {
      return true;
    }

    return (time() - $lastVoteTime) >= $this->cooldownSeconds;
  }
}
