import { Navigator } from '@solidjs/router';
import { createSignal } from 'solid-js';

export const [activeUrl, setActiveUrl] = createSignal<string>(window.location.pathname)

const history: string[] = [window.location.pathname]

export function navigate(navigator: Navigator, url: string): void {
    navigator(url, { replace: true })
    setActiveUrl(url)

    history.push(url)
}

export function navigateBack(navigator: Navigator): void {
    history.pop()
    let url: string | undefined = history.pop()

    if (url && url?.length > 0) {
        navigate(navigator, url)
    }
}

export function getQueryParams(): {[key: string]: string} {
    return Object.fromEntries(new URLSearchParams(window.location.search).entries())
}

export function clearQueryParameters(): void {
    window.history.pushState(null, '', window.location.origin + window.location.pathname) 
}
