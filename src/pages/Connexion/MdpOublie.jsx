import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from '../../store/languageContext';

function MdpOublie() {
    const { languageData } = useLanguage();

    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les messages d'erreur

    const submitMdp = async () => {
        try {
            const response = await fetch('http://localhost/word-box/server/routeur.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    objet: 'Client',
                    action: 'updateMdp',
                    username: login,
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await submitMdp();
        if (isValid) {
            window.location.href = "/home"; // Rediriger vers la page d'accueil
        } else {
            setErrorMessage("Échec de la connexion. Inscription Failed.");
        }
    };
    return (
        <main>
            <div class="wrapper">
                <form onSubmit={handleSubmit}>
                    <h2>{languageData.forgotPassword}</h2>
                    <div class="input-box">
                        <input type="txt" placeholder={languageData.username} value={login}
                            onChange={(e) => setLogin(e.target.value)} // Met à jour l'état
                            required />
                        <i class='bx bxs-lock-alt'></i>
                    </div>
                    <div class="input-box">
                        <input type="password" placeholder={languageData.newMdp} value={mdp}
                            onChange={(e) => setMdp(e.target.value)} // Met à jour l'état
                            required />
                        <i class='bx bxs-lock-alt'></i>
                    </div>
                    <button type="submit" class="btn"><Link to="/connexion">OK</Link></button>
                </form>
            </div>
        </main>
    )
}

export default MdpOublie;