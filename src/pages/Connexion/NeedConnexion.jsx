import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from '../../store/languageContext';

function NeedConnexion() {
    const { languageData } = useLanguage();

    return (
        <main>
            <div class="wrapper">
                <h1>{languageData.noAccountTitle}</h1>
                <h2>{languageData.noAccount}</h2>
                <button class="btn"><Link to="/connexion">{languageData.createAccount}</Link></button>
            </div>
        </main>
    )
}

export default NeedConnexion;