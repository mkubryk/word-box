import React, { createContext, useState,useEffect, useContext } from 'react';
import { classByTheme } from '../script/change-theme'; // Assure-toi que cette fonction change le texte du DOM

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