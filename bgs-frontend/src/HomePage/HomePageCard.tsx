import { IJsxElement } from "../types/general-types";
import './HomePageCard.scss';

export interface IHomePageCard {
    content: string
    imgname: string
    title: string
}

export interface IHomePageCardProps {
    card: IHomePageCard
}

export function HomePageCard(props: IHomePageCardProps): IJsxElement {

    function imageSrc(imgName: string): string {
        return `/src/assets/${imgName}`
    }

    return (
        <div class="homepage-card d-flex column align-center">
            <img src={imageSrc(props.card.imgname)} alt="img" />
            
            <div class="card-body d-flex column p-2">
                <h3 class="card-title text-center pt-4 pb-2">{props.card.title}</h3>
                <p class="card-text">{props.card.content}</p>
            </div>
        </div>
    )
}
