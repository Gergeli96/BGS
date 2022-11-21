export interface JwtPayload {
    username: string
}

export interface IWhoAmI {
    username: string | null
    token: string | null
    id: number | null
    loggedin: boolean
    email: string | null
    avatar: string | null
}

export interface IRegistrationStatus {
    success: boolean
}
