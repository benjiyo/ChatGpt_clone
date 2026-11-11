CREATE DATABASE IF NOT EXISTS chatgpt_clone;
USE chatgpt_clone;

CREATE TABLE IF NOT EXISTS conversations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role ENUM('user', 'assistant') NOT NULL,
  content TEXT NOT NULL,            -- TEXT holds up to 65535 bytes
  token_count INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


