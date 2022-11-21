import { getImageLinkFromFileList } from "../helpers/drive-image-helper";
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

    return (
        <div class="connected-webshop-item-preview-container d-flex column justify-center cursor-pointer pr-4" onClick={() => navigate(navigator, `/webshopitem?id=${props.item.id}`)}>
            <div class="image-container d-flex justify-center align-center">
                <img src={getImageLinkFromFileList(props.item.files)} alt="preview" />
            </div>

            <div class="design pt-2">{props.item.design}</div>
        </div>
    )
}
