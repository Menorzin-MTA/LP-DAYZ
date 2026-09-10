-- ============================================
-- BANCO DE DADOS - LAST POINT
-- Tabela de contas compartilhada entre o SITE
-- e o SERVIDOR MTA
-- ============================================

CREATE DATABASE IF NOT EXISTS lastpoint
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lastpoint;

CREATE TABLE IF NOT EXISTS accounts (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(20) NOT NULL UNIQUE,
    password_hash VARCHAR(60) NOT NULL,   -- hash bcrypt (compatível com passwordHash() do MTA)
    is_admin      TINYINT(1) NOT NULL DEFAULT 0,
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login    DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dica: se no futuro quiser guardar dados do jogo ligados à conta
-- (dinheiro, VIP, inventário, etc), crie tabelas separadas com uma
-- foreign key para accounts.id, em vez de acrescentar tudo aqui.
