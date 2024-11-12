import { Link } from 'react-router-dom';
import '../css/header.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../store/languageContext';
import { useTheme } from '../store/themeContext';
import { useEffect, useState } from 'react';

function Header() {
    const { language, setLanguage, languageData } = useLanguage();
    const [userName, setUsername] = useState();
    const [mdp, setMdp] = useState();
    const { theme, setTheme, themeData } = useTheme();
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les messages d'erreur

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const changeLang = () => {
        const newLang = language === "fr" ? "en" : "fr";
        setLanguage(newLang);
    };

    useEffect(() => {
        // Fonction pour récupérer le userName depuis sessionStorage
        const handleStorageChange = () => {
            const storedUserName = sessionStorage.getItem("userName"); // Vérifier sessionStorage
            const storedMdp = sessionStorage.getItem("mdp"); // Vérifier sessionStorage

            if (storedUserName) {
                setUsername(storedUserName);
                console.log("Stored username: ", storedUserName);
            } else {
                setUsername(''); // Réinitialiser si non trouvé
            }

            if (storedMdp) {
                setMdp(storedMdp);
                console.log("Stored mdp: ", storedMdp);
            } else {
                setMdp(''); // Réinitialiser si non trouvé
            }
        };

        // Initialiser le userName au premier rendu
        handleStorageChange();

        // Ajouter un écouteur pour les changements dans le sessionStorage
        window.addEventListener('storage', handleStorageChange);

        // Nettoyer l'écouteur au démontage du composant
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    const disconnect = async () => {
        try {
            const response = await fetch('http://localhost/word-box/server/routeur.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    objet: 'Client',
                    action: 'disconnect',
                    username: userName,
                    mdp: mdp,

                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('reponse webservice', data);
            return data.data;
        } catch (error) {
            console.error("Erreur lors de la création du compte :", error);
            return false;
        }
    };

    // Appeler la fonction checkCredentials dans handleSubmit
    const handleDisconnection = async (e) => {
        e.preventDefault();

        const isValid = await disconnect();
        if (isValid) {
            sessionStorage.removeItem('userName'); // Supprimer le nom d'utilisateur du sessionStorage
            window.location.href = "/connexion"; // Rediriger vers la page d'accueil
        } else {
            setErrorMessage("Échec de la déconnexion. Disconnection Failed.");
        }
    };

    return (
        <header class={themeData.header}>
            <div class={themeData.title}>
                <i class="bi bi-book"></i>
                <h1 style={{ fontFamily: 'Lucida Handwriting' }} data-translate-key="wordBox">
                    Boîte à mot
                </h1>
            </div>

            <nav class={themeData.navBar}>
                <div class={themeData.alignRedirectPage}>
                    <li><Link to={`/home`} data-translate-key="home">{languageData.home}</Link></li>
                    {!userName ? (
                        <li><Link to={`/connexion`} data-translate-key="connexion">{languageData.connexion}</Link></li>) : ""}
                    {!userName ? (
                        <li><Link to={`/inscription`} data-translate-key="signIn">{languageData.signIn}</Link></li>) : ""}

                    <li><Link to={`/mes-mots`} data-translate-key="favList">{languageData.favList}</Link></li>
                </div>

                <div class="settings">
                    { userName ? (
                        <i class="bi bi-person-check" onClick={handleDisconnection}> {userName}</i>
                    ) : ""}
                    <i class={`bi ${theme === "light" ? "bi-brightness-high" : "bi-moon-stars-fill"}`} id="theme" onClick={changeTheme}></i>
                    <i class={`flag-icon-${language === "fr" ? "en" : "fr"}`} id="lang" onClick={changeLang}></i>
                </div>
            </nav>
        </header>
    );
}

export default Header;
