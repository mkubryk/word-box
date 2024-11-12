import { Link } from "react-router-dom";
import { useLanguage } from '../../store/languageContext';
import { useTheme } from '../../store/themeContext';

function NeedConnexion() {
    const { languageData } = useLanguage();
    const {themeData} = useTheme();
    return (
        <main class={themeData.main}>
            <div class={themeData.wrapper +" fit-box"}>
                <h1>{languageData.noAccountTitle}</h1>
                <br />
                <h2 class="center-text">{languageData.noAccount}</h2>
                <div class="wrapper fit-box">
                    <button class="btn"><Link to="/connexion">{languageData.connect}</Link></button>
                    <button class="btn"><Link to="/inscription">{languageData.createAccount}</Link></button>
                </div>
            </div>
        </main>
    )
}

export default NeedConnexion;