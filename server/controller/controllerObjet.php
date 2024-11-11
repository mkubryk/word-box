
<?php
require_once(__DIR__ . "/../model/mot_sympa.php");
require_once(__DIR__ . "/../model/liste_mot_sympa.php");
require_once(__DIR__ . "/../model/client.php");
class controllerObjet {
	
    
	public static function delete(){
		$classe=static::$classe;
		$identifiant=static::$identifiant;
		if (isset($_GET[$identifiant]))
			$identifiant= $_GET[$identifiant];
		$classe::delete($identifiant);

	}

	public static function create(){
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

	public static function update(){
		$champs = static::$champs;
		$identifiant =static::$identifiant;
		$donnees = array();
		foreach ($_GET as $key => $value){
			if ($key != "objet" && $key != "action") {
				if (in_array($key, array_keys($champs))) {
					$donnees[$key] = $value;
					echo "$value";
				}   
			}
		}
		$donnees[$identifiant]=$_GET[$identifiant];
		$classe = static::$classe;
		$classe::update($donnees);
	}



}
?>