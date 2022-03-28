import { createContext } from "react";
import { JsxElement } from "typescript";

interface Icontext{
    togglePannel : () => void
}

const AuthProvider = ({ children }: JsxElement) => {
    
    const context = createContext<Icontext | null>(null)

    // const togglePanel = () => {
    //     setShowPanel(!showPanel)
    // }

    // let providerValue: Icontext = {
        
    // }
    return 
}

export default AuthProvider;