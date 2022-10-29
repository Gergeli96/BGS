import { IDetailedWebshopItem } from "../types/webshop-types";
import { navigate } from "../helpers/navigation-helper";
import { IJsxElement } from "../types/general-types";
import { useNavigate } from "@solidjs/router";
import { BitImage } from "../shared/BitImage";
import './WebshopItemPreview.scss';

export interface IWebshopItemPreviewProps {
    item: IDetailedWebshopItem
}

export function WebshopItemPreview(props: IWebshopItemPreviewProps): IJsxElement {
    const navigator = useNavigate()

    function getImage(): string {
        return props.item.files?.length > 0 ? `http://drive.google.com/uc?export=view&id=${props.item.files[0].fileid}` : 'src/assets/image-not-found.png'
    }

    return (
        <div class="webshop-item-preview-container d-flex column p-2">
            <div class="image-container d-flex justify-center align-center">
                <BitImage src={getImage()} />
            </div>

            <h3 class="cursor-pointer pt-2 pb-2" onClick={() => navigate(navigator, `/webshopitem/${props.item.id}`)}>{props.item.name}</h3>

            <p title={props.item.description}>{props.item.description}</p>
        </div>
    )
}
