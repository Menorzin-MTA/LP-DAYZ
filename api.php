<?php
// api.php - Processamento de Requisições
session_start();
require_once 'db.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// ============================================
// 1. REGISTRO DE CONTA
// ============================================
if ($action === 'register') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (strlen($username) < 3 || strlen($username) > 20) {
        echo json_encode(['success' => false, 'message' => 'O nome de usuário deve ter entre 3 e 20 caracteres.']);
        exit;
    }

    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'A senha deve ter pelo menos 6 caracteres.']);
        exit;
    }

    // Hash Bcrypt compatível com MTA passwordHash
    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    try {
        $stmt = $pdo->prepare("INSERT INTO accounts (username, password_hash) VALUES (?, ?)");
        $stmt->execute([$username, $password_hash]);
        $user_id = $pdo->lastInsertId();

        $_SESSION['user_id'] = $user_id;
        $_SESSION['username'] = $username;

        echo json_encode(['success' => true, 'message' => 'Conta criada com sucesso!', 'username' => $username]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo json_encode(['success' => false, 'message' => 'Este nome de usuário já está em uso.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao criar conta.']);
        }
    }
    exit;
}

// ============================================
// 2. LOGIN
// ============================================
if ($action === 'login') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM accounts WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        // Atualiza o último login
        $updateStmt = $pdo->prepare("UPDATE accounts SET last_login = NOW() WHERE id = ?");
        $updateStmt->execute([$user['id']]);

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];

        echo json_encode([
            'success' => true, 
            'message' => 'Login realizado!', 
            'user' => [
                'id' => $user['id'], 
                'username' => $user['username'],
                'created_at' => $user['created_at']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuário ou senha incorretos.']);
    }
    exit;
}

// ============================================
// 3. LOGOUT E VERIFICAÇÃO DE SESSÃO
// ============================================
if ($action === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'check_session') {
    if (isset($_SESSION['user_id'])) {
        $stmt = $pdo->prepare("SELECT id, username, is_admin, created_at, last_login FROM accounts WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();
        echo json_encode(['logged_in' => true, 'user' => $user]);
    } else {
        echo json_encode(['logged_in' => false]);
    }
    exit;
}

// ============================================
// 4. CHECKOUT DE COMPRA (Finalizar Carrinho)
// ============================================
if ($action === 'checkout') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'Você precisa estar logado para comprar.']);
        exit;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $items = $input['items'] ?? [];

    if (empty($items)) {
        echo json_encode(['success' => false, 'message' => 'Seu carrinho está vazio.']);
        exit;
    }

    $pdo->beginTransaction();
    try {
        foreach ($items as $item) {
            for ($i = 0; $i < $item['quantity']; $i++) {
                // Gera um código único de resgate no MTA (Ex: LP-8F3A-99B2)
                $code = 'LP-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 4)) . '-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 4));

                $stmt = $pdo->prepare("INSERT INTO inventory (account_id, item_type, item_name, price, redeem_code) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $_SESSION['user_id'],
                    $item['type'] ?? 'item',
                    $item['name'],
                    $item['price'],
                    $code
                ]);
            }
        }
        $pdo->commit();
        echo json_encode(['success' => true, 'message' => 'Compra realizada com sucesso! Itens adicionados ao seu inventário.']);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['success' => false, 'message' => 'Erro ao processar compra: ' . $e->getMessage()]);
    }
    exit;
}

// ============================================
// 5. OBTER INVENTÁRIO DO JOGADOR
// ============================================
if ($action === 'get_inventory') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'Não autorizado.']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM inventory WHERE account_id = ? ORDER BY purchased_at DESC");
    $stmt->execute([$_SESSION['user_id']]);
    $items = $stmt->fetchAll();

    echo json_encode(['success' => true, 'inventory' => $items]);
    exit;
}
?>