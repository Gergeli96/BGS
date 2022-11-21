export interface IWhoAmI {
    username: string | null
    token: string | null
    id: number | null
    loggedin: boolean
    email: string | null
    avatar: string | null
}

export class EmptyWhoAmI implements IWhoAmI {
    public username: string | null = ''
    public token: string | null = ''
    public id: number | null = null
    public loggedin: boolean = false
    public email: string | null = ''
    public avatar: string | null = ''
}
