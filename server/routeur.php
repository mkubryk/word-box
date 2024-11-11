<?php
// Insertion de la session
require_once(__DIR__ . "/model/session.php");

// Connexion
require_once(__DIR__ . "/config/connexion.php");
connexion::connect();

// Ajouter des en-têtes pour gérer CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Gérer les requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Actions et objets possibles
$actions = ["update", "continue", "delete", "create", "connect", "disconnect", "inscrire","createWord","updateMdp", "checkMDP", "userFavWords","displayAll", "displayOne", "getClient"];
$objets = ["objet", "Client", "Mot_sympa", "Liste_mot_sympa"];

// Valeurs par défaut
$objet = "objet";
$action = "connect";

// Test si un objet correct est passé dans l'URL
if (isset($_POST["objet"]) && in_array($_POST["objet"], $objets)) {
    $objet = $_POST["objet"];
}

// Test si une action correcte est passée dans l'URL
if (isset($_POST["action"]) && in_array($_POST["action"], $actions)) {
    $action = $_POST["action"];
}


// Vérifier si aucun client n'est connecté et si l'action nécessite une connexion
if (!session::clientConnected() && in_array($action, [ "disconnect"])) {
    $objet = "Client";
    $action = "connect";
}

// Construction du contrôleur
$controller = "controller" . ucfirst($objet);

// Insertion du contrôleur avec chemin absolu
require_once(__DIR__ . "/controller/$controller.php");

// Appel des méthodes du contrôleur
$controller::$action();
?>
