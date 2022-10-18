import { IJsxElement } from "../../types/general-types";
import { DeleteImages } from "./DeleteImages";
import { UploadImages } from "./UploadImages";

export function EditImages(): IJsxElement {

    return (<>
        <UploadImages />
        <div class="p-4"></div>
        <DeleteImages />
    </>)
}
