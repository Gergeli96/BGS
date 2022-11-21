import { IJsxElement } from "../types/general-types";
import { createSignal, onMount } from "solid-js";

export interface IBitImageProps {
    attributes?: {[key: string]: string}
    src: string
}

function getMaxSize(parent: HTMLElement): number {
    if (parent.clientWidth > parent.clientHeight) {
        return parent.clientHeight
    }
    else {
        return parent.clientWidth
    }
}

export function BitImage(props: IBitImageProps): IJsxElement {
    const [style, setStyle] = createSignal<any>({})
    let imgElement: HTMLImageElement | undefined

    onMount(() => {
        if (props.attributes) {
            Object.keys(props.attributes).forEach(key => imgElement?.setAttribute(key, (props.attributes as any)[key]))
        }

        // window.addEventListener('resize', onImageLoad)
    })

    // onCleanup(() => window.removeEventListener('resize', onImageLoad))

    function onImageLoad(): void {
        let image = imgElement as HTMLImageElement
        let parent = image.parentElement as HTMLElement

        if (parent.clientWidth > parent.clientHeight) {
            setStyle({width: 'fit-content', height: '100%'})
        }
        else {
            setStyle({width: '100%', height: 'fit-content'})
        }
    }

    return (
        <img ref={imgElement} src={props.src} alt="image" style={style()} onLoad={onImageLoad} />
    )
}
