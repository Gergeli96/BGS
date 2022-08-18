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

export interface ILoginForm {
    username: string
    password: string
}

export interface IRegistrationForm extends IUser {
    password2: string
    key: string
}
