export interface IWhoAmI {
    id: number | null
    username: string | null
    loggedin: boolean
    token: string | null
}

export interface IUser {
    id?: number
    username: string
    password: string
    email: string
}
