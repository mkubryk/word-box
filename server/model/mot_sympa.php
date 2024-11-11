<?php
require_once("objet.php");
class Mot_sympa extends objet
{
    protected static $classe = "Mot_sympa";
    protected static $identifiant = "numMot";
    protected int $numMot;
    protected string $nomMot;
    protected string $nomMotFR;
    protected ?string $definitionMotENG;
    protected ?string $definitionMotFR;

    public function __construct(int $numMot = NULL, string $nomMot = NULL, string $nomMotFR = NULL, string $definitionMotENG = NULL, string $definitionMotFR = NULL)
    {
        if (!is_null($numMot)) {
            $this->numMot = $numMot;
            $this->nomMot = $nomMot;
            $this->nomMotFR = $nomMotFR;
            $this->definitionMotFR = $definitionMotFR;
            $this->definitionMotENG = $definitionMotENG;
        }
    }

    // Getters pour accéder aux propriétés protégées
    public function getNumMot()
    {
        return $this->numMot;
    }

    public function getNomMot()
    {
        return $this->nomMot;
    }

    public function getNomMotFR()
    {
        return $this->nomMotFR;
    }

    public function getDefinitionMotENG()
    {
        return $this->definitionMotENG;
    }

    public function getDefinitionMotFR()
    {
        return $this->definitionMotFR;
    }

    // Fonction pour transformer l'objet en tableau
    public function toArray()
    {
        return [
            'numMot' => $this->getNumMot(),
            'nomMot' => $this->getNomMot(),
            'nomMotFR' => $this->getNomMotFR(),
            'definitionMotENG' => $this->getDefinitionMotENG(),
            'definitionMotFR' => $this->getDefinitionMotFR(),
        ];
    }

    // Fonction pour afficher l'objet en chaîne
    public function __toString()
    {
        return "mot $this->numMot ($this->nomMot)";
    }

    public static function userFavWords($userName)
    {
        $requetePreparee = "CALL GetUserFavoriteWords(:userName)";
        $resultat = connexion::pdo()->prepare($requetePreparee);

        try {
            // Associer le paramètre
            $resultat->bindParam(':userName', $userName, PDO::PARAM_STR);
            $resultat->execute();
            $resultat->setFetchMode(PDO::FETCH_CLASS, "Mot_sympa");
            $words = $resultat->fetchAll();

            // Convertir les objets en tableaux associatifs
            $wordsArray = array_map(function ($word) {
                return $word->toArray();
            }, $words);

            return JsonUtil::jsonResponse("Récupération des mots favoris : " . "<br>Requête SQL : $requetePreparee <br> Données : " . print_r($wordsArray, true), $wordsArray);
        } catch (PDOException $e) {
            JsonUtil::jsonResponse("Erreur lors de la récupération des mots favoris : " . $e->getMessage() . "<br>Requête SQL : $requetePreparee<br>Données : " . print_r([$userName], true));
        }
    }

    public static function getMotById($id)
{
    $classeRecuperee = static::$classe;
    $requetePreparee = "SELECT * FROM $classeRecuperee WHERE numMot = :id_tag;";
    $resultat = connexion::pdo()->prepare($requetePreparee);
    $tags = array("id_tag" => $id);

    try {
        $resultat->execute($tags);
        $resultat->setFetchMode(PDO::FETCH_CLASS, $classeRecuperee);
        $element = $resultat->fetch();

        // Vérification supplémentaire pour s'assurer que l'objet est bien récupéré
        if ($element) {
            return $element;
        } else {
            JsonUtil::jsonResponse("Erreur : Aucun mot trouvé avec l'ID $id");
            return null;
        }
    } catch (PDOException $e) {
        JsonUtil::jsonResponse("Erreur lors de la récupération : " . $e->getMessage() . "<br>Requête SQL : $requetePreparee<br>Données : " . print_r($id, true));
        return null;
    }
}

    public static function createWord($donnees)
    {
        $classeRecuperee = static::$classe;
        $champs = implode(", ", array_keys($donnees));
        $tags = ":" . implode(", :", array_keys($donnees));
        $requete = "INSERT INTO $classeRecuperee ($champs) VALUES ($tags)";
        $pdo = connexion::pdo();

        try {
            $requetePreparee = $pdo->prepare($requete);
            $requetePreparee->execute($donnees);

            // Récupérer l'ID du dernier mot inséré
            $lastId = $pdo->lastInsertId();

            // Debug pour vérifier si l'ID est bien récupéré
            if (!$lastId) {
                return JsonUtil::jsonResponse("Erreur : Aucun ID récupéré après insertion");
            }

            // Récupérer le mot par son ID
            $mot = self::getMotById($lastId);

            // Vérifier si l'objet Mot_sympa est bien récupéré
            if ($mot) {
                return JsonUtil::jsonResponse("Insertion réussie !", $mot->toArray());
            } else {
                return JsonUtil::jsonResponse("Erreur lors de la récupération du mot après insertion avec ID : $lastId");
            }
        } catch (PDOException $e) {
            JsonUtil::jsonResponse("Erreur lors de l'insertion : " . $e->getMessage() . "<br> Requête SQL : $requete <br> Données : " . print_r($donnees, true));
        }
    }

}
?>