import axios from "axios";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

const urlSignIn = 'http://localhost:3001/auth/login';
const urlMe = 'http://localhost:3001/auth/me';

type AuthContextType = {
    userAuth;
    isAuthenticated: boolean;
    signIn: (data: { email, password }) => Promise<void>
    signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    var userAuth = null;
    const [user, setUser] = useState(null);
    
    //Verificando se o usuário está logado
    var isAuthenticated = !!userAuth;

    //Procurando por um token salvo nos cookies
    useEffect(() => {
        const { 'tokenQuebraGalho': token } = parseCookies();

        if( token ) {
            axios.get(
                urlMe,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            .then((response) => setUser(response.data))
            .catch((err) => {
              console.error("Vish! " + err);
            })
        }
    }, []);

    userAuth = user;

    //Chamada da API e recebimento do token JWT
    async function signIn( { email, password } ) {
        event.preventDefault();
        try{
            await axios.post(
                urlSignIn,
                {
                    email: email,
                    password: password, 
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST ',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {const res = response.data; userAuth = res;})

            setCookie(undefined, 'tokenQuebraGalho', userAuth.accessToken, {
                maxAge: 60 * 60 * 1, //1 hora 
            })

            alert(`Bem vindo, ${userAuth.user.fullName}!`);
            Router.push('/');
        } catch (e) {
            if (e.response.status === 401) {
                alert(
                  'Erro! Credenciais inválidas.'
                );
            }
        }
    }

    async function signOut() {
        destroyCookie({}, 'tokenQuebraGalho');
        alert('Saindo...');
    }

    return (
        <AuthContext.Provider value = {{ userAuth, isAuthenticated, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    )
}