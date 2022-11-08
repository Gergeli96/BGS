import { createContext, useContext } from "solid-js"

export interface IBitAuth {
    isLoggedIn: boolean
}

export class BitAuth implements IBitAuth {
    public isLoggedIn: boolean = true
}

export const AuthContext = createContext<BitAuth>(new BitAuth())
export const useAuth = () => useContext(AuthContext)
