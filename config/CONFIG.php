<?php
// Site Configuration
define('SITE_NAME', 'IRIS Education');
define('SITE_URL', 'http://localhost/iris_education');
define('BASE_PATH', __DIR__ . '/../');

// Upload Configuration
define('UPLOAD_PATH', BASE_PATH . 'assets/uploads/');
define('MAX_FILE_SIZE', 2 * 1024 * 1024); // 2MB
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']);

// Session Configuration
define('SESSION_LIFETIME', 3600); // 1 hour

// Pagination
define('ITEMS_PER_PAGE', 20);

// Time Zone
date_default_timezone_set('Asia/Jakarta');
?>
*/

// 3. API/EVENTS/LIST.PHP
// ============================================
/*
<?php
require_once '../../config/database.php';
require_once '../../classes/Queries.php';
require_once '../../includes/functions.php';

header('Content-Type: application/json');

$db = Database::getInstance()->getConnection();
$queries = new IRISEducationQueries($db);

try {
    $page = $_GET['page'] ?? 1;
    $limit = $_GET['limit'] ?? 20;
    $status = $_GET['status'] ?? null;
    $type = $_GET['type'] ?? null;
    
    $where = [];
    $params = [];
    
    if ($status) {
        $where[] = "e.status = :status";
        $params['status'] = $status;
    }
    
    if ($type) {
        $where[] = "e.event_type = :type";
        $params['type'] = $type;
    }
    
    $where_clause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';
    
    $offset = ($page - 1) * $limit;
    
    $sql = "SELECT e.*, 
            COUNT(ep.participant_id) as total_participants,
            u.full_name as creator_name
            FROM events e
            LEFT JOIN event_participants ep ON e.event_id = ep.event_id
            LEFT JOIN users u ON e.created_by = u.user_id
            $where_clause
            GROUP BY e.event_id
            ORDER BY e.start_date DESC
            LIMIT :limit OFFSET :offset";
    
    $stmt = $db->prepare($sql);
    foreach ($params as $key => $value) {
        $stmt->bindValue(":$key", $value);
    }
    $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
    $stmt->execute();
    
    $events = $stmt->fetchAll();
    
    jsonResponse(true, 'Success', $events);
    
} catch (Exception $e) {
    jsonResponse(false, $e->getMessage());
}
?>
*/

// 4. API/EVENTS/REGISTER.PHP
// ============================================
/*
<?php
require_once '../../config/database.php';
require_once '../../classes/Queries.php';
require_once '../../includes/session.php';
require_once '../../includes/functions.php';

requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed');
}

$db = Database::getInstance()->getConnection();
$queries = new IRISEducationQueries($db);
$user = getLoggedUser();

try {
    $event_id = $_POST['event_id'];
    
    // Register user to event
    $queries->registerUserToEvent($event_id, $user['user_id']);
    
    // Create notification
    $queries->createNotification(
        $user['user_id'],
        'event',
        'Pendaftaran Event Berhasil',
        'Anda berhasil terdaftar ke event',
        $event_id,
        'event'
    );
    
    jsonResponse(true, 'Berhasil mendaftar ke event!');
    
} catch (Exception $e) {
    jsonResponse(false, $e->getMessage());
}
?>