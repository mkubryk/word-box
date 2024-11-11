<?php
require_once("objet.php");
require_once (__DIR__."/../util/JsonUtil.php");

class Client extends objet {
    protected static $classe ="Client";
    protected static $identifiant = "userName";
    protected ?string $nomClient;
    protected ?string $prenomClient;
    protected string $mdp;
    protected string $userName;
    
    public function __construct (string $nomClient=null,string $prenomClient=null,string $mdp= NULL,string $userName= NULL){
        if(!is_null($userName)){
            $this->nomClient =$nomClient;
            $this->prenomClient=$prenomClient;
            $this->mdp =$mdp;
            $this->userName = $userName;
        }
    }

    public function __toString(){
		$chaine = "Client $this->userName ($this->nomClient,$this->prenomClient,$this->mdp)";
		return $chaine;
	}
    
    public static function checkMDP($userName, $mdp) {
        $requetePreparee = "SELECT * FROM Client WHERE userName= '$userName' AND mdp='$mdp'";
        $resultat = connexion::pdo()->prepare($requetePreparee);
        try {
            $resultat->execute();
            $resultat->setFetchmode(PDO::FETCH_CLASS, "Client");
            $leClient = $resultat->fetch();
            return $leClient;
            
        } catch (PDOException $e) {
            JsonUtil::jsonResponse("Erreur lors du checkMDP : " . $e->getMessage() . "<br>Requête SQL : $requetePreparee<br>Données : " . print_r([$userName, $mdp], true));

        }
    }



    public static function connect($login,$mdp) {
        $classe = static::$classe;
        if ($classe::checkMDP($login, $mdp) !== null) {
            //$idClient = static::getOne($login)->get("userName");
            $_SESSION["userName"] = $login;
            $_SESSION["mdp"] = $mdp;
            return JsonUtil::jsonResponse("Connexion utilisateur : " . print_r([$login, $mdp],true),["userName" => $login, "mdp" => $mdp]);
        } else {
            return JsonUtil::jsonResponse("Erreur lors de la connexion utilisateur : " . print_r([$login, $mdp],false));
        }
    }
    
    public static function inscrire($nom, $prenom, $userName, $mdp) {
        // Récupérer les données du formulaire        
        $client = array("nomClient" => $nom, "prenomClient" => $prenom,  "userName" => $userName, "mdp" => $mdp);
        return Client::create($client);
     }

     public static function updateFromForm($nom, $prenom, $userName, $mdp) {        
        $client = array("nomClient" => $nom, "prenomClient" => $prenom, "userName" => $userName, "mdp" => $mdp);
        return Client::update($client);

    }
    
    public static function updateMdp( $userName, $mdp) {        
        $client = array( "userName" => $userName, "mdp" => $mdp);
        return Client::update($client);

    }
    
}
?>