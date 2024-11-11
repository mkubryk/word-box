<?php
require_once(__DIR__ . "/../model/mot_sympa.php");
require_once(__DIR__ . "/controllerObjet.php");
class controllerMot_sympa extends controllerObjet
{

    protected static string $classe = "Mot_sympa";
    protected static string $identifiant = "numMot";
    protected static $champs = array(
        "nomMot" => ["text", "Mot"],
        "nomMotFR" => ["text", "Mot FR"],
        "definitionMotFR" => ["text", "definition FR"],
        "definitionMotENG" => ["password", "definition ENG"]
    );

    public static function userFavWords()
    {
        $userName = isset($_POST["userName"]) ? $_POST["userName"] : null;
        return Mot_sympa::userFavWords($userName);
    }
    public static function createWord(){
		$champs = static::$champs;
		$donnees = array();
		foreach ($_POST as $key => $value){
			if ($key != "objet" && $key != "action") {
					$donnees[$key] = $value;
			}
		}
		$classe = static::$classe;
		return $classe::createWord($donnees);
	}
}
?>