CREATE DATABASE IF NOT EXISTS vibecity
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vibecity;

CREATE TABLE IF NOT EXISTS places (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  lat DECIMAL(10,7) NOT NULL,
  lng DECIMAL(10,7) NOT NULL,
  address VARCHAR(255) NULL,
  category VARCHAR(100) NOT NULL,
  image TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  session_token VARCHAR(64) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vibe_marks (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  place_id INT UNSIGNED NOT NULL,
  session_id INT UNSIGNED NOT NULL,
  vibe VARCHAR(20) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_place_id (place_id),
  INDEX idx_session_id (session_id),
  INDEX idx_place_session_created (place_id, session_id, created_at),
  CONSTRAINT fk_vibe_marks_place
    FOREIGN KEY (place_id) REFERENCES places(id),
  CONSTRAINT fk_vibe_marks_session
    FOREIGN KEY (session_id) REFERENCES sessions(id)
);
