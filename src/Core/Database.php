<?php
class Database
{
  public static function getConnection(): PDO
  {
    $config = require __DIR__ . '/../../config/database.php';

    return new PDO(
      sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $config['host'],
        $config['dbname'],
        $config['charset']
      ),
      $config['username'],
      $config['password'],
      [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      ]
    );
  }
}
