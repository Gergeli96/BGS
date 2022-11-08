import { createSignal, onCleanup, onMount } from "solid-js";
import { IJsxElement } from "../types/general-types";

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

        if (image.width > image.height) {
            // setStyle({width: `${getMaxSize(parent)}px`, height: 'auto'})
            setStyle({width: '100%', height: 'auto'})
        }
        else {
            // setStyle({width: 'auto', height: `${getMaxSize(parent)}px`})
            setStyle({width: 'auto', height: '100%'})
        }
    }

    return (
        <img ref={imgElement} src={props.src} alt="image" style={style()} onLoad={onImageLoad} />
    )
}
