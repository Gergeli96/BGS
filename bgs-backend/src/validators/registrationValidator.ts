import { UserRegisterDto } from "src/dto/user.dto";
import { BaseValidator } from "./BaseValidator";

export class RegistrationValidator extends BaseValidator<UserRegisterDto> {

    constructor(model: UserRegisterDto) {
        super(model)
        this.ruleFor('password', m => m.password !== m.password2, 'A két jelszónak meg kell egyeznie!')
        this.ruleFor('key', m => m.key !== process.env.SECRET, 'Hibás kulcs!')
    }
}
