import { Link } from 'react-router-dom'
import React from 'react';
import '../css/footer.css';
import { useLanguage } from '../store/languageContext';

function Footer() {
    const {languageData } = useLanguage();

    return (
        <footer>
            <h2  data-translate-key="credits">{languageData.credits}</h2>
            <nav>
                <Link to="/about-us"><p  data-translate-key="aboutUs">{languageData.aboutUs}</p></Link>
                <div class="contact">
                    <p data-translate-key="phone">{languageData.phone}</p>
                    <p data-translate-key="owner">{languageData.owner}</p>
                    <p data-translate-key="address">{languageData.address}</p>
                </div>
            </nav>
        </footer>
    );
}

export default Footer;