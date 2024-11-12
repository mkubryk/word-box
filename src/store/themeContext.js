import React, { createContext, useState,useEffect, useContext } from 'react';

export const classByTheme = {
    light: {
        wrapper: "wrapper",
        inputBox: "input-box",
        btn : "btn",
        souvenirOublie: "souvenir-oublie",
        navBar: "navbar",
        alignRedirectPage: "align-redirect-page",
        footer: "footer",
        header: "header",
        title : "title",
        main: "main",
    },
    dark: {
        wrapper: "dark-wrapper",
        inputBox: "dark-input-box",
        btn : "dark-btn",
        souvenirOublie: "dark-souvenir-oublie",
        navBar: "dark-navbar",
        alignRedirectPage: "dark-align-redirect-page",
        footer: "dark-footer",
        header: "dark-header",
        title: "dark-title",
        main: "dark-main"
    }
};

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [themeData, setThemeData] = useState(classByTheme[theme]); 

    useEffect(() => {
        localStorage.setItem('theme', theme);
         setThemeData(classByTheme[theme]);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, themeData, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
export { ThemeContext, ThemeProvider };