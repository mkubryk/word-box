<?php
require_once(__DIR__ . "/../model/mot_sympa.php");
require_once(__DIR__ . "/../model/client.php");
require_once(__DIR__ . "/controllerObjet.php");
class controllerListe_mot_sympa extends controllerObjet
{

    protected static string $classe = "Liste_mot_sympa";

    protected static $champs = array(
        "userName" => ["text", "Username"],
        "numMot" => ["number", "numMot"]
    );

    public static function createWord(){
		$champs = static::$champs;
		$donnees = array();
		foreach ($_POST as $key => $value){
			if ($key != "objet" && $key != "action") {
					$donnees[$key] = $value;
			}
		}
		$classe = static::$classe;
		return $classe::create($donnees);
	}

}
?>