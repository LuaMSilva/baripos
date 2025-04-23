import React, { useContext } from "react";
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from "../contexts/auth";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes"; // Rotas protegidas (Dash, funcionalidades)

function Routes(){
    const { signed } = useContext(AuthContext); // Valida para logar apenas se usuário estiver cadastrado

    const loading = false;

    return(
        signed ? <AppRoutes/> : <AuthRoutes/>       
    )
}

export default Routes;