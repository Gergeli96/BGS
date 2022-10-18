import { IDetailedWebshopItem } from "../types/webshop-types";
import { IJsxElement } from "../types/general-types";
import { BitImage } from "../shared/BitImage";
import './WebshopItemPreview.scss';

export interface IWebshopItemPreviewProps {
    item: IDetailedWebshopItem
}

export function WebshopItemPreview(props: IWebshopItemPreviewProps): IJsxElement {

    function getImage(): string {
        return props.item.files?.length > 0 ? `http://drive.google.com/uc?export=view&id=${props.item.files[0].fileid}` : 'src/assets/image-not-found.png'
    }

    return (
        <div class="webshop-item-preview-container d-flex column p-2">
            <div class="image-container d-flex justify-center align-center">
                <BitImage src={getImage()} />
            </div>

            <h3 class="pt-2 pb-2">{props.item.name}</h3>

            <p>{props.item.description}</p>
        </div>
    )
}
