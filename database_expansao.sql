USE lastpoint;

-- 1. Tabela de Inventário / Itens Comprados pelos Jogadores
CREATE TABLE IF NOT EXISTS inventory (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id INT UNSIGNED NOT NULL,
    item_type VARCHAR(50) NOT NULL,    -- 'kit', 'vip', 'coins'
    item_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    redeem_code VARCHAR(16) NOT NULL UNIQUE, -- Código para resgatar no MTA (ex: /resgatar CODE)
    status ENUM('pending', 'active', 'redeemed') DEFAULT 'active',
    purchased_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_inventory_account FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabela de Carrinho de Compras em Aberto
CREATE TABLE IF NOT EXISTS cart_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id INT UNSIGNED NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    CONSTRAINT fk_cart_account FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;