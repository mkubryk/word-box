import React from 'react';
import { useLanguage } from '../../store/languageContext';

const AboutUs = () => {
    const { languageData } = useLanguage();
    return (
        <div className="wrapper">
            <h1 data-translate-key="aboutUs">
                {languageData.aboutUs}
            </h1>
            <br />
            <p data-translate-key="txt1Presentation">
                {languageData.txt1Presentation}
            </p>
            <br />

            <h2 data-translate-key="tiltle2Presentation">
                {languageData.tiltle2Presentation}
            </h2>
            <br />

            <p data-translate-key="txtMission">
                {languageData.txtMission}
            </p>
            <br />

            <h2 data-translate-key="tilteTeam">
                {languageData.tilteTeam}
            </h2>
            <br />

            <p data-translate-key="txtTeam">
                {languageData.txtTeam}
            </p>
            <br />

            <h2 data-translate-key="titleContact">
                {languageData.titleContact}
            </h2>
            <br />

            <p data-translate-key="txtContact">
                {languageData.txtContact}
            </p>
        </div>
    );
};

export default AboutUs;