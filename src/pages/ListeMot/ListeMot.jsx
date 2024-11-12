import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../store/languageContext';
import { useTheme } from '../../store/themeContext';

const ListeMot = () => {
  const [mots, setMots] = useState([]);
  const { language, languageData } = useLanguage();
  const { themeData } = useTheme();



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

  // Fonction pour récupérer les mots favoris depuis le back
  const getFavWords = async (login) => {
    try {
      const response = await fetch('http://localhost/word-box/server/routeur.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          objet: 'Mot_sympa',
          action: 'userFavWords',
          userName: login,
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

  // Charger les mots favoris au montage du composant
  useEffect(() => {
    const fetchFavWords = async () => {
      const userName = sessionStorage.getItem('userName') ?? 'leChevalierNoir'; // Remplacez par le nom d'utilisateur connecté
      const favWords = await getFavWords(userName);
      setMots(favWords);
    };

    fetchFavWords();
  }, []);

  // Fonction pour basculer le statut de favori
  const supprFavoris = (item) => {
    const element = document.getElementById(item.nomMot);
    if (element) {
      element.classList.toggle("bi-suit-heart-fill");
      element.classList.toggle("bi-suit-heart");
    }
  };

  return (
    <main class={themeData.main}>
      <div>
        {sessionStorage.getItem('userName') === 'leChevalierNoir' ?
          <h1>{languageData.ourList}</h1>
          : ''}
        {mots.length === 0 ?
          <div class={themeData.wrapper +" fit-box"}>
            <div class={themeData.wrapper +" fit-box"}>
              <h1>{languageData.emptyList}</h1>
              <br />
              <h2 class={themeData.wrapper +" fit-box"}>{languageData.fillList} <i class="bi bi-backpack3-fill"></i></h2>

              <button class="btn" data-translate-key="goToFillList"><Link to={`/home`} data-translate-key="goToFillList">{languageData.goToFillList}</Link></button>

            </div>
          </div>
          : ''}
        <div>
          {mots.map((item, index) => {
            // Sélectionne la définition selon la langue
            const definition = language === 'fr' ? item.definitionMotFR : item.definitionMotENG;
            const mot = language === 'fr' ? item.nomMotFR : item.nomMot;

            return (
              <div key={index} class={themeData.wrapper}>
                <h1>{mot}</h1>
                <i
                  class="bi bi-suit-heart-fill"
                  id={mot}
                  onClick={() => supprFavoris(item)}
                ></i>
                <p>
                  <strong>{languageData.definition}</strong> {definition || languageData.unknownDef}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ListeMot;
