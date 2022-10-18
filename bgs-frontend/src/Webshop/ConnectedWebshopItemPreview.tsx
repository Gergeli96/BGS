import { IDetailedWebshopItem } from "../types/webshop-types";
import { navigate } from "../helpers/navigation-helper";
import { IJsxElement } from "../types/general-types";
import { useNavigate } from "@solidjs/router";
import './ConnectedWebshopItemPreview.scss';

export interface IConnectedWebshopItemPreviewProps {
    item: IDetailedWebshopItem
}

export function ConnectedWebshopItemPreview(props: IConnectedWebshopItemPreviewProps): IJsxElement {
    const navigator = useNavigate()

    function getImage(): string {
        let name: string = ''

        if (Array.isArray(props.item.files) && props.item.files.length > 0) {
            name = props.item.files[0].fileid
        }

        return `http://drive.google.com/uc?export=view&id=${name}`
    }

    return (
        <div class="connected-webshop-item-preview-container d-flex column justify-center cursor-pointer pr-4" onClick={() => navigate(navigator, `/webshopitem?id=${props.item.id}`)}>
            <div class="image-container d-flex justify-center align-center">
                <img src={getImage()} alt="preview" />
            </div>

            <div class="design pt-2">{props.item.design}</div>
        </div>
    )
}
