import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../css/inscription.css';
import { useLanguage } from '../../store/languageContext';

function Connexion() {

    const { languageData } = useLanguage();
    // Déclarez les états pour les champs du formulaire et les messages d'erreur
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les messages d'erreur

   
    // Fonction pour vérifier les identifiants via le backend PHP
    const checkCredentials = async (login, mdp) => {
        try {
            const response = await fetch('http://localhost/word-box/server/routeur.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    objet: 'Client',
                    action: 'connect',
                    userName: login,
                    mdp: mdp,
                }),
            });

            const data = await response.json();
            console.log('reponse webservice' ,data);
            return data.data;
        } catch (error) {
            console.error("Erreur lors de la vérification des identifiants :", error);
        }
    };

    // Appeler la fonction checkCredentials dans handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await checkCredentials(login, mdp);
        if (isValid!==null) {
            console.log("connexion reussi ? : ", isValid);
            sessionStorage.setItem('userName', login); // Stocker le nom d'utilisateur dans le sessionStorage
            window.location.href = "/home"; // Rediriger vers la page d'accueil
        } else {
            setErrorMessage("Échec de la connexion. Veuillez vérifier vos identifiants.");
        }
    };
    return (
        <main>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1 data-translate-key="connexion">{languageData.connexion}</h1>
                  
                    <div className="input-box">
                        <input
                            type="text"
                            name="login"
                            data-translate-key="username"
                            placeholder={languageData.username}
                            required
                            value={login}
                            onChange={(e) => setLogin(e.target.value)} // Met à jour l'état
                        />
                        <i className='bx bxs-user'></i>
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            name="mdp"
                            data-translate-key="password"
                            placeholder={languageData.password}
                            required
                            value={mdp}
                            onChange={(e) => setMdp(e.target.value)} // Met à jour l'état
                        />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Affiche les erreurs */}

                    <button type="submit" className="btn" data-translate-key="connect">{languageData.connect} </button>
                </form>

                <div className="souvenir-oublie">
                    <input type="checkbox" />
                    <label data-translate-key="rememberMe">{languageData.rememberMe}</label>

                    <Link to="/mdp-oublie" data-translate-key="forgotPassword">{languageData.forgotPassword}</Link>
                </div>

                <div className="lien-inscription">
                    <div className="align-content">
                        <p data-translate-key="createAccount">{languageData.createAccount} </p>
                        <Link to="/inscription" data-translate-key="register">{languageData.register}</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Connexion;
