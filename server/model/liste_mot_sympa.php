<?php
require_once("mot_sympa.php");
require_once("client.php");
require_once("objet.php");
class Liste_mot_sympa extends objet {
    protected static $classe ="Liste_mot_sympa";
    protected ?int $numMot;
    protected ?string $userName;
    

    public function __construct (int $numMot=null,string $userName=null){
        if(!is_null($userName) && !is_null($numMot)){
            $this->numMot =$numMot;
            $this->userName = $userName;
        }
    }

    public function __toString(){
		$chaine = "Liste favori login : $this->userName &  mot : $this->numMot";
		return $chaine;
	}

    public static function deleteFav($userName,$numMot){
        $classeRecuperee = static::$classe;
		$requetePreparee = "DELETE FROM $classeRecuperee WHERE  userName = '$userName' AND numMot = $numMot";
		$resultat = connexion::pdo()->prepare($requetePreparee);
		try {
			$resultat->execute();
			return JsonUtil::jsonResponse(	"Delete réussie !", [$userName,$numMot]);
		} catch (PDOException $e) {
			JsonUtil::jsonResponse("Erreur lors de la suppression : " . $e->getMessage() . "<br> Requête SQL : $requetePreparee<br>Données : " . print_r([$userName,$numMot], true));

		}

	}

    
    
}
?>