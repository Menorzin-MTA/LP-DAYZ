<?php
// db.php - Conexão Segura PDO
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$db   = 'lastpoint';
$user = 'root'; // Altere para seu usuário do banco
$pass = '';     // Altere para sua senha do banco

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro na conexão com o banco de dados.']);
    exit;
}
?>