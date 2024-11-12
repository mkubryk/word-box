import { Link } from "react-router-dom";
import '../../css/inscription.css';
import { useLanguage } from '../../store/languageContext';
import { useTheme } from '../../store/themeContext';
import React, { useState } from "react";

function Inscription() {
    const { languageData } = useLanguage();
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les messages d'erreur
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const {themeData} = useTheme();

    
    // Fonction pour vérifier les identifiants via le backend PHP
    const submitInscription = async () => {
        try {
            const response = await fetch('http://localhost/word-box/server/routeur.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    objet: 'Client',
                    action: 'inscrire',
                    userName: login,
                    mdp: mdp,
                    prenomClient: prenom,
                    nomClient: nom

                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('reponse webservice', data);
            return true;
        } catch (error) {
            console.error("Erreur lors de la création du compte :", error);
            return false;
        }
    };

    // Appeler la fonction checkCredentials dans handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await submitInscription();
        if (isValid) {
            window.location.href = "/home"; // Rediriger vers la page d'accueil
        } else {
            setErrorMessage("Échec de la connexion. Inscription Failed.");
        }
    };
    return (
        <main class={themeData.main}>

            <div class={themeData.wrapper}>
                <form onSubmit={handleSubmit}>
                    <h1 data-translate-key="signIn">{languageData.signIn}</h1>
                    <div class={themeData.inputBox}>
                        <input 
                        type="text"
                         name="nomClient"
                          placeholder={languageData.lastName}
                          value={nom}
                          onChange={(e) => setNom(e.target.value)} // Met à jour l'état
                          required />
                        <i class='bx bxs-user'></i>
                    </div>
                    <div class={themeData.inputBox}>
                        <input 
                        type="text"
                         name="prenomClient"
                          placeholder={languageData.firstName} 
                          value={prenom}
                          onChange={(e) => setPrenom(e.target.value)} // Met à jour l'état
                          required />
                        <i class='bx bxs-user'></i>
                    </div>
                    <div class={themeData.inputBox}>
                        <input type="text" name="login"
                         placeholder={languageData.username} 
                         value={login}
                         onChange={(e) => setLogin(e.target.value)} // Met à jour l'état
                         required />
                        <i class='bx bxs-user-circle'></i>
                    </div>
                    <div class={themeData.inputBox}>
                        <input type="password" name="mdp" 
                        placeholder={languageData.password}
                        value={mdp}     
                        onChange={(e) => setMdp(e.target.value)} // Met à jour l'état

                        required />
                        <i class='bx bxs-lock-alt'></i>
                    </div>
                   

                    <div class={themeData.souvenirOublie}>
                        <Link to="/connexion" data-translate-key="connect" >{languageData.connect}</Link>
                    </div>
                    <button type="submit" class={themeData.btn+" link-color" } data-translate-key="register" >{languageData.register}</button>
                </form>
            </div>
        </main>
    )
}

export default Inscription;