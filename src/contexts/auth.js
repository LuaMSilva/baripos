import React, { createContext, useState, useEffect } from "react";
import { db } from '../firebaseConnection'
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc } from 'firebase/firestore'
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }){        
    const[user, setUser] = useState(null);

    const navigation = useNavigation();

    async function signUp(nome, email, password){
         await addDoc(collection(db, "usuarios"),{
            nome: nome,
            email: email,
            senha: password
         })
         .then(() => {
            console.log('Casdastrado com sucesso!')
            navigation.goBack();
         })
         .catch(() => {
            console.log("Erro ao cadastrar",err)
         })
    }

    async function signIn(email, password) {
        console.log("Email teste: ", email)
        console.log("Senha teste: ", password)
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;