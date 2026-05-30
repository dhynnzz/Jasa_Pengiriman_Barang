<?php
$host = 'aws-0-ap-southeast-1.pooler.supabase.com';
$port = 5432;
$db = 'postgres';
$user = 'postgres.aadwrmoalohtkvsqaybv';
$pass = 'M.aminuddin';
try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
    echo "Connected successfully to 5432\n";
} catch (PDOException $e) {
    echo "5432 Error: " . $e->getMessage() . "\n";
}

try {
    $pdo2 = new PDO("pgsql:host=$host;port=6543;dbname=$db", $user, $pass);
    echo "Connected successfully to 6543\n";
} catch (PDOException $e) {
    echo "6543 Error: " . $e->getMessage() . "\n";
}
