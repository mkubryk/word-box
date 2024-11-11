<?php
require_once (__DIR__."/../util/JsonUtil.php");

class objet
{
	protected static $classe;
	protected static $identifiant;

	// getter (pour tout les attributs)
	public function get($attribut)
	{
		return $this->$attribut;
	}

	// setter (pour tout les attributs)
	public function set($attribut, $valeur)
	{
		$this->$attribut = $valeur;
	}

	public static function getAll()
	{
		$classeRecuperee = static::$classe;
		$requete = "SELECT * FROM $classeRecuperee;";
		//envoi de la requete et stockage de la reponse dans une variable $resultat
		$resultat = connexion::pdo()->query($requete);
		//traitement de la reponse par le prisme de la classe
		$resultat->setFetchmode(PDO::FETCH_CLASS, $classeRecuperee);
		//recuperation des instances de bd dans une variable $tableau
		$tableau = $resultat->fetchALL();
		//on retourne Le tableau d'instances
		return $tableau;
	}

	public static function getOne($id)
	{
		$classeRecuperee = static::$classe;
		$identifiant = static::$identifiant;
		$requetePreparee = "SELECT * FROM $classeRecuperee WHERE $identifiant = :id_tag;";
		$resultat = connexion::pdo()->prepare($requetePreparee);
		$tags = array("id_tag" => $id);
		try {
			$resultat->execute($tags);
			$resultat->setFetchmode(PDO::FETCH_CLASS, $classeRecuperee);
			$element = $resultat->fetch();
			return $element;
		} catch (PDOException $e) {
			JsonUtil::jsonResponse("Erreur lors de la récupération : " . $e->getMessage() . "<br>Requête SQL : $requetePreparee<br>Données : " . print_r($id, true));

		}
	}

	public static function delete($id)
	{
		$classeRecuperee = static::$classe;
		$identifiant = static::$identifiant;
		$requetePreparee = "DELETE FROM $classeRecuperee WHERE $identifiant = :id_tag;";
		$resultat = connexion::pdo()->prepare($requetePreparee);
		$tags = array("id_tag" => $id);
		try {
			$resultat->execute($tags);
			return JsonUtil::jsonResponse(	"Delete réussie !", $id);
		} catch (PDOException $e) {
			JsonUtil::jsonResponse("Erreur lors de la suppression : " . $e->getMessage() . "<br>Requête SQL : $requetePreparee<br>Données : " . print_r($id, true));

		}
	}

	public static function create($donnees)
	{
		$classeRecuperee = static::$classe;
		$champs = implode(", ", array_keys($donnees));
		$tags = ":" . implode(", :", array_keys($donnees));
		$requete = "INSERT INTO $classeRecuperee ($champs) VALUES ($tags)";
		$pdo = connexion::pdo();
		try {
			$requetePreparee = $pdo->prepare($requete);
			$requetePreparee->execute($donnees);
			return JsonUtil::jsonResponse(	"Insertion réussie !", $donnees);
		} catch (PDOException $e) {
			JsonUtil::jsonResponse("Erreur lors de l'insertion : " . $e->getMessage() . "<br> Requête SQL : $requete <br> Données : " . print_r($donnees, true));
		return;
	}
	
	}

	public static function update($donnees)
	{
		$classeRecuperee = static::$classe;
		$identifiant = static::$identifiant;
		$champs = "";
		foreach ($donnees as $champ => $valeur) {
			$champs .= "$champ = :$champ, ";
		}
		$champs = rtrim($champs, ', ');
		$id = $donnees[$identifiant];
		$requete = "UPDATE $classeRecuperee SET $champs WHERE $identifiant = $id";

		$requetePreparee = connexion::pdo()->prepare($requete);
		try {
			$requetePreparee->execute($donnees);
			return JsonUtil::jsonResponse(	"Update réussie !", $donnees);

		} catch (PDOException $e) {
			JsonUtil::jsonResponse("Erreur lors de la mise à jour : " . $e->getMessage() . "<br>Requête SQL : $requete<br>Données : " . print_r($donnees, true));

		}
	}

}
?>