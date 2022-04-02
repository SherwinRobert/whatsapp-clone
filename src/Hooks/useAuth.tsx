import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

interface ISession{
    isLoggedIn: boolean
    uid : string
}

interface IChildren{
    children?: React.ReactNode
}

interface IContext{
    createAccount: (email: string, password: string) => Promise<UserCredential>,
    signIn: (email: string, password: string) => Promise<UserCredential>,
    logOut: () => Promise<void>,
    user: ISession,

}

const Auth = React.createContext<IContext>({} as IContext);

    export const useAuth = () => {
        return useContext(Auth)
    }

    const AuthProvider = ({ children }:IChildren) => {

    const [user, setUser] = useState<ISession>({
        isLoggedIn: false,
        uid: "",
    });

    const auth = getAuth();
    const createAccount = (email:string,password:string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email:string,password:string) => {
        return signInWithEmailAndPassword(auth, email, password) 
    };
    
    const logOut = () => {
        return auth.signOut();
    }

        useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser({
                isLoggedIn: user ? true : false,
                uid: user?.uid ? user?.uid: " "
            });
        });

            return unsubscribe;
        }, []);

    let value = {
        signIn,
        createAccount,
        logOut,
        user
    }

    return (
        <Auth.Provider value={value}>
            {children}
        </Auth.Provider>
    )
}

export default AuthProvider;