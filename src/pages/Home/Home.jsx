import React, { useState, useEffect, useRef } from "react";
import '../../css/accueil.css';
import { useLanguage } from '../../store/languageContext';
import { event } from "jquery";

function Home() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState('');
  const [translatedMot, setTranslatedMot] = useState('');
  const [translatedDefinition, setTranslatedDefinition] = useState('');
  const { language, languageData } = useLanguage();

  // Crée une référence pour l'icône de favoris
  const favIconRef = useRef(null);

  // Fonction pour récupérer la définition du mot via l'API DictionaryAPI
  const fetchDefinitionFromDictionaryAPI = async (mot) => {
    if (!mot) return;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${mot}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const def = data[0]?.meanings[0]?.definitions[0]?.definition || 'Définition introuvable';
      setDefinition(def);
    } catch (error) {
      console.error(`Erreur lors du chargement de la définition pour ${mot}:`, error);
      setDefinition('Erreur de chargement');
    }
  };

  // Fonction pour traduire un texte via l'API Google Translate
  const translateText = async (text, targetLang) => {
    const sourceLang = 'en';
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(text)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data?.[0]?.[0]?.[0] || text;
    } catch (error) {
      console.error('Erreur lors de la traduction:', error);
      return text;
    }
  };

  // Fonction pour traduire le mot et sa définition
  const fetchTranslations = async () => {
    if (language === 'en') {
      setTranslatedMot(word);
      setTranslatedDefinition(definition);
    } else {
      const translatedMot = await translateText(word, language);
      const translatedDef = await translateText(definition, language);
      setTranslatedMot(translatedMot);
      setTranslatedDefinition(translatedDef);
    }
  };

  // Chercher la définition et la traduction lors de la recherche
  const SearchWord = async (event) => {
    event.preventDefault();
    await fetchDefinitionFromDictionaryAPI(word);
    await fetchTranslations();
  };

  useEffect(() => {
    if (definition) {
      fetchTranslations();
    }
  }, [language, definition]);

  const addFavWords = async () => {
    try {
      const response = await fetch('http://localhost/word-box/server/routeur.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          objet: 'Mot_sympa',
          action: 'createWord',
          nomMot: word,
          nomMotFr: translatedMot,
          definitionMotFR: translatedDefinition,
          definitionMotENG: definition,
        }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }
      const data = await response.json();
      console.log('Réponse du webservice:', data);
      return data.data || [];
    } catch (error) {
      console.error("Erreur lors de l'ajout du mot favori :", error);
      return [];
    }
  };

  const addFavWordsToUser = async (login, numMot) => {
    try {
      const response = await fetch('http://localhost/word-box/server/routeur.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          objet: 'Liste_mot_sympa',
          action: 'createWord',
          userName: login,
          numMot: numMot,
        }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }

      const data = await response.json();
      console.log('Réponse du webservice:', data);
      return data.data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des mots favoris :", error);
      return [];
    }
  };

  const deleteFavWordsToUser = async (login, numMot) => {
    try {
      const response = await fetch('http://localhost/word-box/server/routeur.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          objet: 'Liste_mot_sympa',
          action: 'delete',
          userName: login,
          numMot: numMot,
        }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }

      const data = await response.json();
      console.log('Réponse du webservice:', data);
      return data.data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des mots favoris :", error);
      return [];
    }
  };

  // Gestion des favoris
  const supprFavoris = async (word) => {
    const icon = favIconRef.current; // Utilisation de la référence
    let user = sessionStorage.getItem('userName');

    // Vérifier si l'utilisateur est connecté
    if (!user) {
      console.error("L'utilisateur n'est pas connecté");
      window.location.href = '/no-account';
    }

    if (icon) {
      icon.classList.toggle('bi-suit-heart-fill');
      icon.classList.toggle('bi-suit-heart');
    }
    if (icon.classList.contains('bi-suit-heart-fill')) {
      let word = await addFavWords();
      console.log('mot :',word);
      let numMot = word.numMot;
      await addFavWordsToUser(user, numMot);
    } else {
      await deleteFavWordsToUser(user, word.numMot);
    }
  };

  return (
    <div className="container">
      <div className="wrapper fit-box center-text">
        <h2 data-translate-key="titleSearch">{languageData.titleSearch}</h2>
        <form onSubmit={SearchWord}>
          <div className="input-box">
            <input
              type="text"
              id="search"
              name="search"
              value={word}
              onChange={(event) => setWord(event.target.value)}
              placeholder={languageData.enterWord}
            />
          </div>
          <button className="btn" type="submit" data-translate-key="search">{languageData.search}</button>
        </form>
      </div>

      {/* Affichage des résultats */}
      <div className="result">
        {translatedMot && (
          <div className="wrapper fit-box center-text">
            <h1>{translatedMot}</h1>
            {/* Utilisation de la référence pour l'icône */}
            <i
              className="bi bi-suit-heart"
              ref={favIconRef}
              onClick={() => supprFavoris(word)}
            ></i>
            <p><strong>{languageData.definition}</strong> {translatedDefinition || languageData.loading}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
