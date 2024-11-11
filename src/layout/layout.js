import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { LanguageProvider } from '../store/languageContext';
import { ThemeProvider } from '../store/themeContext';

export default function Layout() {
    return (

        <LanguageProvider>
            <ThemeProvider>
                <div id="sidebar">
                    <Header />
                    <div>
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </ThemeProvider>

        </LanguageProvider>


    );
}