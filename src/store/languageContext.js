import React, { createContext, useState, useEffect, useContext } from 'react';
import { translations, changeLanguage } from '../script/translate'; // Assure-toi que cette fonction change le texte du DOM

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en'); // Langue par défaut : 'en'
    const [languageData, setLanguageData] = useState(translations[language]); // Récupère les données de traduction

    // Effet pour appliquer la langue au montage et au changement de langue
    useEffect(() => {
        // Mettre à jour le localStorage avec la nouvelle langue
        localStorage.setItem('lang', language);

        // Appliquer les traductions dans le DOM
        changeLanguage(language);

        // Mettre à jour les données de langue dans l'état
        setLanguageData(translations[language]);
    }, [language]); // Exécuter à chaque changement de langue

    return (
        <LanguageContext.Provider value={{ language, setLanguage, languageData }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

export { LanguageContext, LanguageProvider };
