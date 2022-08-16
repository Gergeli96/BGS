export interface JwtPayload {
    username: string
}

export interface IWhoAmI {
    username: string | null
    token: string | null
    id: number | null
    loggedin: boolean
}

export interface IRegistrationStatus {
    success: boolean
}
