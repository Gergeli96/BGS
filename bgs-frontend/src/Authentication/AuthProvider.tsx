import { Accessor, createContext, createSignal, Setter, Show, useContext } from "solid-js"
import { EmptyWhoAmI, IWhoAmI } from "../types/auth-types"
import { IJsxElement } from "../types/general-types"
import { LoadingPage } from "../shared/LodingPage"
import { Get } from "../helpers/http"

export let TOKEN: string = ''
export class BitAuth {
    private readonly LocalStorageKey: string = 'TOKEN'
    private interval: number | null = null

    constructor(
        public user: Accessor<IWhoAmI>,
        private setUser: Setter<IWhoAmI>,
        public autenticated: Accessor<boolean>,
        private setAutenticated: Setter<boolean>,
        private userLoadedSetter: Setter<boolean>
    ) {
        this.loadUser()
    }

    public loadUser(): void {
        let storedToken = localStorage.getItem(this.LocalStorageKey)
        if (storedToken != null && storedToken?.length > 0) {
            TOKEN = storedToken
            this.refreshToken()
                .then(() => this.userLoadedSetter(true))
                .catch(() => this.userLoadedSetter(true))
        }
        else this.userLoadedSetter(true)
    }

    public login(user: IWhoAmI): void {
        TOKEN = user.token ?? ''
        this.setUser(user)
        this.setAutenticated(true)
        this.storeToken(TOKEN)

        if (this.interval == null) {
            this.interval = setInterval(() => this.refreshToken(), 20 * 60000)
        }
    }

    public logOut(): void {
        TOKEN = ''
        this.setUser(new EmptyWhoAmI())
        this.setAutenticated(false)
        this.storeToken(null)
        
        if (this.interval != null) {
            this.interval = null
            clearInterval(this.interval as unknown as number)
        }
    }

    private storeToken(token: string | null): void {
        token == null ? localStorage.removeItem(this.LocalStorageKey) : localStorage.setItem(this.LocalStorageKey, token)
    }

    private refreshToken(): Promise<void> {
        return new Promise(resolve => {
            Get<IWhoAmI>('auth/resfresh')
                .then(response => this.login(response))
                .catch(error => { })
                .finally(() => resolve())
        })
    }
}

export interface IAuthProviderProps {
    children: IJsxElement
}

const AuthContext = createContext<BitAuth>()

export function AuthProvider(props: IAuthProviderProps): IJsxElement {
    const [authenticated, setAuthenticated] = createSignal<boolean>(false)
    const [user, setUser] = createSignal<IWhoAmI>(new EmptyWhoAmI())
    const [userLoaded, setUserLoaded] = createSignal<false>()
    const data = new BitAuth(user, setUser, authenticated, setAuthenticated, setUserLoaded)

    return (
        <Show when={userLoaded()} fallback={<LoadingPage />}>
            <AuthContext.Provider value={data}>
                {props.children}
            </AuthContext.Provider>
        </Show>
    ) 
}

export function useAuth() { return useContext(AuthContext) }
