export class UserDto {
    public id?: number
    public username: string
    public password: string
    public email: string
}

export class UserRegisterDto extends UserDto {
    public password2: string
    public key: string
}

export class LoginDto {
    public username: string
    public password: string
}
