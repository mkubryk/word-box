<?php
require_once(__DIR__ . "/../model/client.php");
require_once(__DIR__ . "/controllerObjet.php");
class controllerClient extends controllerObjet {
    
    protected static string $classe = "Client";
	protected static string $identifiant = "userName";
    protected static $champs = array(
        "nomClient" => ["text", "Nom"],
        "prenomClient" => ["text", "Prénom"],
        "userName" => ["text", "Pseudo"],
        "mdp" => ["password", "Mot de passe"]
    );
    
    public static function inscrire() {        
		$userName = isset($_POST["userName"]) ? $_POST["userName"] : null;
		$mdp = isset($_POST["mdp"]) ? $_POST["mdp"] : null;
        $nom = isset($_POST["nomClient"]) ? $_POST["nomClient"] : null;
        $prenom = isset($_POST["prenomClient"]) ? $_POST["prenomClient"] : null;
        $mdp = isset($_POST["mdp"]) ? $_POST["mdp"] : null;
        return Client:: inscrire($nom, $prenom, $userName, $mdp);
    }
    
	public static function connect() {
		$login = isset($_POST["userName"]) ? $_POST["userName"] : null;
		$mdp = isset($_POST["mdp"]) ? $_POST["mdp"] : null;
		//$elt=objet::getOne($login);
		//if  ($elt instanceof Client ) {
		return Client::connect($login,$mdp);
	}

    public static function updateFromForm() {
        
        // Récupérer les données du formulaire
        $nom = isset($_POST["nomClient"]) ? $_POST["nomClient"] : null;
        $prenom = isset($_POST["prenomClient"]) ? $_POST["prenomClient"] : null;
        $userName = isset($_POST["userName"]) ? $_POST["userName"] : null;
        $mdp = isset($_POST["mdp"]) ? $_POST["mdp"] : null;

        return Client::updateFromForm($nom, $prenom, $userName, $mdp);
    }
    public static function updateMdp() {        
        // Récupérer les données du formulaire
        $userName = isset($_POST["userName"]) ? $_POST["userName"] : null;
        $mdp = isset($_POST["mdp"]) ? $_POST["mdp"] : null;

        return Client::updateMdp($userName, $mdp);
    }

    public static function getClient() {
        $userName = isset($_POST["userName"]) ? $_POST["userName"] : null;
        return Client::getOne($userName);
    }

    public static function checkMDP() {
        $login = isset($_POST["userName"]) ? $_POST["userName"] : null;
        $mdp = isset($_POST["mdp"]) ? $_POST["mdp"] : null;
        return Client::checkMDP($login, $mdp);
    }
    public static function disconnect(){
        session_unset();
        session_destroy();
        setcookie(session_name(), '', time()-1);
        
    }

}
?>