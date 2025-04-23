import React, { createContext, useState, useEffect } from "react";
import { auth, db } from '../firebaseConnection'
import { doc, getDoc, getDocs, onSnapshot, setDoc, collection, addDoc } from 'firebase/firestore'
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         onAuthStateChanged,
         signOut 
        } from "firebase/auth";

export const AuthContext = createContext({});

function AuthProvider({ children }){        
    const[user, setAuthUser] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser({
                email: user.email,
                name: user.nome,
                uid: user.uid
            }) // Mantém o usuário no estado mesmo ao recarregar
            return;
          }
          setAuthUser(null);

        });
      
        return () => unsubscribe(); // Limpa o listener ao desmontar
      }, []);

    async function signUp(nome, email, password) {
        try {
          // Primeiro cria o usuário na autenticação
          const user = await createUserWithEmailAndPassword(auth, email, password);
      
          // Se a criação for bem-sucedida, salva no Firestore
          await setDoc(doc(db, "usuarios", user.user.uid), {
            nome: nome,
            email: email,
            senha: password, // apagar depois a senha 
            uid: user.user.uid // opcional: salva o ID do usuário autenticado
          });
       
          console.log('Cadastrado com sucesso!');
          navigation.goBack();
      
        } catch (err) {
          console.log("Erro ao cadastrar:", err);
        }
      }
     
    function signIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const { user } = userCredential;
      
            // Busca os dados do usuário no Firestore usando o UID
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
              const userData = docSnap.data();
      
              setAuthUser({
                uid: user.uid,
                email: user.email,
                nome: userData.nome, // agora sim o nome vem do banco
              });
      
              console.log("Login feito com sucesso");
              navigation.replace('Dashboard');
            } else {
              console.log("Usuário não cadastrado.");
            }
          })
          .catch(err => {
            if (err.code === "auth/missing-password") {
              alert("A senha é obrigatória!");
              return;
            }
            if (err.code === "auth/invalid-credential") {
              alert("Senha incorreta!");
              return;
            }
            console.log(err.code);
         });
    }
      

    async function handleSignOut(){
      await signOut(auth)

      setAuthUser(null);
    }

/*

    async function signIn(email, password) {
        console.log("Email teste: ", email)
        console.log("Senha teste: ", password)
    }

    useEffect(() => {

        async function getDados(){

            const usersRef = collection(db, "usuarios");

            await getDocs(usersRef)
            .then((snapshot) => { // acessa todos os objetos
                let lista = []

                snapshot.forEach((doc) => {
                    lista.push
                })

            })

        }
        getDados();

    }, [])
*/
    return(
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, handleSignOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;