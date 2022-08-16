import { IOkResponse } from "src/general-types/ok-response";

export abstract class BaseService {

    protected ok(): IOkResponse {
        return { }
    }

}
