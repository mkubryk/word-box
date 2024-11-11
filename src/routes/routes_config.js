// routes_config.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout"
import Connexion from "../pages/Connexion/Connexion";
import Inscription from "../pages/Connexion/Inscription";
import MdpOublie from "../pages/Connexion/MdpOublie";
import Home from "../pages/Home/Home";
import ListeMot from "../pages/ListeMot/ListeMot";
import AboutUs from "../pages/AboutUs/AboutUs";
import NeedConnexion from "../pages/Connexion/NeedConnexion";

// Composant de configuration des routes
const routesConfig = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "home",
                element: <Home/>,
            },
            {
                path: "connexion",
                element: <Connexion />,
            }, {
                path: "inscription",
                element: <Inscription />,
            },
            {
                path: "mdp-oublie",
                element: <MdpOublie />,
            },
            {
                path: "mes-mots",
                element: <ListeMot />,
            },
            {
                path: "about-us",
                element: <AboutUs />,
            },
            {
                path: "no-account",
                element: <NeedConnexion />,
            },
        ],
    }
]);
export default routesConfig
